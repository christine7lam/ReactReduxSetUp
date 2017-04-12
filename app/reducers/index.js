/**
 * Copyright 2016 AT&T, Inc.
 *
 * all bugs added by ykuchinskiy@att.com || kuchinskiy@gmail.com
 *
 * @flow
 */

'use strict';

import {combineReducers} from 'redux';

import eventsReducer from './events';


const combinedReducer = combineReducers({
    events: eventsReducer
});


const rootReducer = (state: any, action: Action) => {
    return combinedReducer(state, action);
};

export default rootReducer;
