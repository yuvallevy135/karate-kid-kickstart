const webpack = require('webpack')
const {merge}  = require('webpack-merge')
const webpackConfig =  require('./webpack.config')
const prodConfig = {
    mode: 'production',
    plugins: [
        new webpack.EnvironmentPlugin({
            TODO_SERVER_URL: ""
          })
    ]

};

module.exports = merge(webpackConfig, prodConfig)