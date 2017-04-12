/**
 * Copyright 2016 AT&T, Inc.
 *
 * all bugs added by ykuchinskiy@att.com || kuchinskiy@gmail.com
 *
 * @flow
 */

'use strict';

//Module dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const routes = require('./routes');

const port = process.env.PORT || 8078;

// configure the express server
const app = express();

// configure IO socket for chat rooms between admin console and clients
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// if we're developing, use webpack middleware for module hot reloading
if (process.env.NODE_ENV !== 'production') {
    console.log('DEV ==> 🌎 using webpack');

    // load and configure webpack
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../www/webpack/dev.config');

    // setup middleware
    const compiler = webpack(config);
    app.use(webpackMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}

// if we're production, don't use anything... for now
if (process.env.NODE_ENV === 'production') {
    console.log('PROD ==> 🌎');
}

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../www/public')));


app.use('/', routes);

// Download recordings from AWS S3 if necessary for testing...
//downloadRecordings();

// Start server
server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (client) {
    console.log("GLOBAL, client connected... id: " + client.id + "   url: " + client.handshake.url);
    //enterChatRoom(client);
});