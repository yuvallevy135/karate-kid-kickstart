const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development', //or production
    entry: {
        main: path.resolve(__dirname, 'src/webpackTodoList.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: 'dist',
        port: 5001, //def 8080
        open: true, //open def browser,
        hot: true,
    },
    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My todo list',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CopyPlugin({
            patterns: [
                { from: "**/**/*.css", to: path.resolve(__dirname, "dist/styles/styles.css")}
            ]
        })
    ],
};