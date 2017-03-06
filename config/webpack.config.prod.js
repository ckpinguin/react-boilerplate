const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const helpers = require('./helpers');
const AssetsPlugin = require('assets-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';


module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        //path: __dirname + '/../dist',
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
        //filename: '[name].[hash].js',
        //chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        //BUG?: new webpack.NoEmitOnErrorsPlugin(), // stop building on failure
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            minimize: true,
            sourceMap: false,
            //mangle: true,
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false
            }
        }),
        // This makes css-modules-require-hook a dependency (like babel-register)
        // Keep the hash here for quicker cache-reloading on SPA's
        new ExtractTextPlugin('[name].[hash:8].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                //minimize: false // workaround for ng2
                minimize: false
            }
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: helpers.root('dist'),
            prettyPrint: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            //'style-loader',
                            'css-loader',
                            'postcss-loader'
                        ],
                    }
                )
            }, {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            //'style-loader',
                            'css-loader?sourceMap=0',
                            // No CSS Modules for the moment, it does not play
                            // well with SSR
                            //'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                            //'css-loader/locals?module&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader',
                            'postcss-loader',
                            'stylus-loader'
                        ]
                    }
                )
            }
        ]
    }
});
