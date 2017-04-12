/**
 * Copyright 2016 AT&T, Inc.
 *
 * all bugs added by ykuchinskiy@att.com || kuchinskiy@gmail.com
 *
 * @flow
 */

'use strict';

if (process.env.NODE_ENV !== 'development' || process.env.PLATFORM_ENV !== 'web') {
    module.exports = require('./ConfigureStore.prod.js');
} else {
    module.exports = require('./ConfigureStore.dev.js');
}
