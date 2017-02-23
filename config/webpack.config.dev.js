const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const helpers = require('./helpers');
const webpack = require('webpack');
const poststylus = require('poststylus');
//var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            //'webpack-dev-server/client',
            //'webpack/hot/only-dev-server',
            helpers.root('src', 'client', 'main.js')
        ]
    },
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'babel-loader',
                query: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: 'style-loader?sourceMap',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            }, {
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                            require: 'autoprefixer'
                        }
                    }, {
                        loader: 'css-loader',
                        // No CSS Modules for the moment, it does not play
                        // well with SSR
                        options: {
                            sourceMap: true,
                            //modules: true,
                            importLoaders: 1,
                            //localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'stylus-loader',
                        options: {
                            stylus: {
                                use: [
                                    poststylus(
                                        [
                                            'postcss-short',
                                            'postcss-sorting',
                                            'postcss-cssnext',
                                            'rucksack-css'
                                        ]
                                    )
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
});
