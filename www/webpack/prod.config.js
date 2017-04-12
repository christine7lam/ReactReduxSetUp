const path = require('path');
const webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'production';
var reduxEnv = process.env.REDUX_ENV || 'production';

module.exports = {
  entry: {
    app: path.join(__dirname, '../../app/web/index'),
    admin: path.join(__dirname, '../../admin/index'),
  },
  output: {
    path: path.join(__dirname, '../public/'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      // take all less files, compile them, and bundle them in with our js bundle
      { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify(nodeEnv),
        REDUX_ENV: JSON.stringify(reduxEnv),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
