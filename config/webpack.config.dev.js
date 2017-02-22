const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const helpers = require('./helpers');
const webpack = require('webpack');
const poststylus = require('poststylus');


module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        //publicPath: 'http://localhost:8080/',
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
