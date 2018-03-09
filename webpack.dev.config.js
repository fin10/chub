const prod = require('./webpack.config')
const merge = require('webpack-merge')

module.exports = merge(prod, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devtool: 'inline-source-map',
})