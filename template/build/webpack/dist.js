'use strict'
require('babel-register')({})

const merge = require('deep-assign')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const p = require('../paths')
const base = require('./base.js')
const utils = require('./utils.js')

const config = merge(base, {
    entry: {
      'vendor': `${p.P.src.js}vendor.js`,
      'main': [
        `${p.P.src.js}main.js`
      ],
    },

    output: {
      path: utils.resolve(p.P.dest.js),
      publicPath: p.P.dest.js,
      filename: utils.isProduction ? '[name].min.js' : '[name].js',
      chunkFilename: utils.isProduction ? '[id]-[name].chunk.min.js' : '[id]-[name].chunk.js',
      library: 'Stem UI',
      libraryTarget: 'umd',
    },

    plugins: [
      new webpack.BannerPlugin({
        banner: utils.banner,
        raw: true,
        entryOnly: true
      })
    ]
})

if (utils.isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // Set the production environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}

module.exports = config