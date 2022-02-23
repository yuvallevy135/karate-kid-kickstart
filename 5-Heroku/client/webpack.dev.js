const webpack = require('webpack')
const {merge}  = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const devConfig = {
    mode: 'development',
    plugins: [
        new webpack.EnvironmentPlugin({
            TODO_SERVER_URL: "http://localhost:5000"
          })
    ]
}

module.exports = merge(webpackConfig, devConfig)