
const {merge}  = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const devConfig = {
    mode: 'development',
    devtool: "eval"
}

module.exports = merge(webpackConfig, devConfig)