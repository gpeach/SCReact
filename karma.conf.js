var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'], //run in PhantomJS

        files: [
            'test/*.js'
        ],

        frameworks: ['mocha'], //use the mocha test framework

        preprocessors: {
            'test/*.js': ['webpack']
        },

        reporters: ['spec', 'coverage', 'html'], //report results in this format

        htmlReporter: {
            outputFile: 'test/results/report.html',

            // Optional 
            pageTitle: 'Unit Tests',
            subPageTitle: 'A sample project description',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary'
                },
                {
                    type: 'html',
                    dir: 'test/coverage'
                }
            ]
        },
        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jsdom-launcher',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-mocha-reporter',
            'karma-webpack',
            'karma-htmlfile-reporter'
        ],

        singleRun: true, //just run once by default

        webpack: {
            node: {
                fs: 'empty'
            },
            resolve: {
                root: path.resolve(__dirname),
                alias: {
                    "jquery": "node_modules/jquery/dist/jquery.min.js"
                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    // Automtically detect jQuery and $ as free var in modules
                    // and inject the jquery library
                    // This is required by many jquery plugins
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery",
                    "root.jQuery": "jquery"
                })],

            // Instrument code that isn't test or vendor code.
            module: {

                loaders: [
                    {
                        test: /\.js$/,
                        include: path.join(__dirname, '/'),
                        exclude: path.join(__dirname, '/node_modules'),
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};