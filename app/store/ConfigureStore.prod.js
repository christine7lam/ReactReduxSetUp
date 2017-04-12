/**
 * Copyright 2016 AT&T, Inc.
 *
 * all bugs added by ykuchinskiy@att.com || kuchinskiy@gmail.com
 *
 * @flow
 */

'use strict';

import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import {autoRehydrate} from 'redux-persist';
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'

// create a store that has redux-thunk and redux-sounds middlewares enabled
const createStoreWithMiddleware = compose(
    // Pre-load our middleware with our sounds data.
    //applyMiddleware(soundsMiddleware(soundsData)),
    applyMiddleware(thunk),
    //make sure to apply this after redux-thunk et al.
    applyMiddleware(createActionBuffer(REHYDRATE)),
)(createStore);

export default function configureStore() {
    // usage of redux-persist, https://github.com/rt2zz/redux-persist
    const store = autoRehydrate()(createStoreWithMiddleware)(reducers);

    return store;
}
