const path = require('path');
const webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'production';
var reduxEnv = process.env.REDUX_ENV || 'production';

module.exports = {
  devtool: 'eval-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client',
            'babel-polyfill',
            path.join(__dirname, '../../app/web/index'),
        ],
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
          plugins: ['transform-object-rest-spread',['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              // this is important for Webpack HMR:
              locals: ['module']
            }],
          }]],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
        REDUX_ENV: JSON.stringify(reduxEnv),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
