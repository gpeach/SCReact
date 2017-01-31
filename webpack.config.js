var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "public_html/src/goodbye.js",
    output: {
        filename: "public_html/build/js/goodbye.min.js"
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            "jquery": "node_modules/jquery/dist/jquery.min.js"
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })],
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
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
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