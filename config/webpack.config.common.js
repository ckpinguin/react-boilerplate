const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');


module.exports = {
    entry: {
        polyfills: helpers.root('src/client/polyfills.js'),
        vendor: helpers.root('src/client/vendor.js'),
        app: helpers.root('src/client/main.js'),
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: [],
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        /**
        * Of course the application code imports vendor code. Webpack itself is
        * not smart enough to keep the vendor code out of the app.js bundle.
        * The CommonsChunkPlugin does that job.
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'app',
                'vendor',
                'polyfills'
            ]
        }),
        // inject the resulting js and cs files
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    stats: { // webpack 2 option
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'components'),
                loader: ExtractTextPlugin.extract(
                    {
                        fallbackLoader: 'style-loader',
                        loader: 'css-loader?sourceMap'
                    }
                )
            },
            /**
            * The second pattern filters for component-scoped styles and loads
            * them as strings via the raw loader — which is what Angular expects
            * to do with styles specified in a styleUrls metadata property.
            */
            /*
            {
                test: /\.css$/,
                include: helpers.root('src', 'components'),
                loader: 'raw-loader'
            },            */


            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            //'style-loader',
                            'css-loader?sourceMap&importLoaders=1',
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
};
