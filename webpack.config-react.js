var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "public_html/src/app.jsx",
    output: {
        filename: "public_html/build/js/app.min.js"
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname)
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['latest', 'react']
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['latest', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", 'resolve-url?sourceMap', "sass?sourceMap"]
            }
        ]
    },
    cache: false,
    devtool: 'source-map'
};