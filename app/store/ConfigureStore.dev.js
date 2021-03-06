/**
 * Copyright 2016 AT&T, Inc.
 *
 * all bugs added by ykuchinskiy@att.com || kuchinskiy@gmail.com
 *
 * @flow
 */

'use strict';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk        from 'redux-thunk';
import reducers     from '../reducers';
import createLogger from 'redux-logger';
import DevTools     from '../web/containers/DevTools';
import {autoRehydrate} from 'redux-persist';
// import soundsMiddleware from 'redux-sounds';
// import soundsData from '../api/sounds';
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'

// create a store that has redux-thunk & redux-sounds middlewares, and dev tooling enabled.
// the logger middleware logs the previous state, the action, and the next
// state in the browser's console for easy debugging and instrumenting the
// dev tools allows for us to commit different actions and go forwards and
// backwards in time using magic
const createStoreWithMiddleware = compose(
    // Pre-load our middleware with our sounds data.
    // applyMiddleware(soundsMiddleware(soundsData)),
    applyMiddleware(thunk),
    //make sure to apply this after redux-thunk et al.
    applyMiddleware(createActionBuffer(REHYDRATE)),
    applyMiddleware(createLogger()),
    DevTools.instrument(),
)(createStore);

export default function configureStore() {
    // usage of redux-persist, https://github.com/rt2zz/redux-persist
    const store = autoRehydrate()(createStoreWithMiddleware)(reducers);

    // enable webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
