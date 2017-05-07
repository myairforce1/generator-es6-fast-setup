var webpack = require('webpack');
module.exports = {
    entry: [
        __dirname + '/index.js'
    ],
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        ]
    },
    resolve:{
        extensions:['.js']
    },
    plugins: [
    ]
};