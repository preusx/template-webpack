'use strict'
require('babel-register')({})

const merge = require('deep-assign')
const p = require('../paths')
const dev = require('./dev.js')

const config = merge(dev, {
    watch: true,
    devtool: '#eval-source-map',

    devServer: {
        contentBase: p.P.dest.js,
        host: '0.0.0.0',
        port: 9000,
        historyApiFallback: true,
        noInfo: true
    }
})

module.exports = config