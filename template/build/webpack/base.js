'use strict'
require('babel-register')({})

const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const p = require('../paths')
const utils = require('./utils.js')

const resolve = utils.resolve

module.exports = {
  resolve: {
    modules: [
      resolve(p.P.src.js),
      resolve('node_modules')
    ],

    cachePredicate: function() { return true },

    alias: {
      src: resolve(p.P.src.js),
      // directives: 'src/directives',
      // helpers: 'src/helpers',
      // mixins: 'src/mixins',
      // styles: 'src/styles',
      vue$: 'vue/dist/vue.common.js'
    },

    // extensions: ['.js', '.json', '.vue', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.(js|vue|es6)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve(p.P.src.js), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        }),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!postcss-loader!stylus-loader',
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: JSON.parse(fs.readFileSync('.babelrc', 'utf8')),
      },
      { test: /\.pug$/, loader: 'pug' },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            styl: ExtractTextPlugin.extract({
              loader: 'css-loader!postcss-loader!stylus-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      { test: /\.json$/, loader: 'json' },
    ]
  },

  // Stats is used to customize Webpack's console output
  // https://webpack.js.org/configuration/stats/
  stats: {
    hash: false,
    colors: true,
    chunks: false,
    version: false,
    children: false,
    timings: true
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: { plugins: require('../config/postcss').config },
        stylus: require('../config/stylus').config,
      }
    }),

    new ExtractTextPlugin(utils.isProduction ? 'js.min.css' : 'js.css'),

    new CommonsChunkPlugin({
      name: 'vendor',
    }),

    new WebpackNotifierPlugin({ title: 'Webpack', alwaysNotify: false }),
  ],
}