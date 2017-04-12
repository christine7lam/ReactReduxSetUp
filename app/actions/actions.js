/**
 * Copyright 2016 AT&T, Inc.
 *
 * NGC actions
 *
 * @version: 1.0
 */
'use strict';

import * as cont from '../constants/constants';



//---------------//
//     GLOBAL    //
//---------------//
export function sampleAction(): Action {
    return {
        type: cont.SAMPLE,
        meta: {sound: 'bonk'}
    }
}
