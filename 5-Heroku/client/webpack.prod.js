const {merge}  = require('webpack-merge')
const webpackConfig =  require('./webpack.config')
const prodConfig = {
    mode: 'production'
};

module.exports = merge(webpackConfig, prodConfig)