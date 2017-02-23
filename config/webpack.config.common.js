const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');


module.exports = {
    entry: {
        polyfills: helpers.root('src', 'client', 'polyfills.js'),
        vendor: helpers.root('src', 'client', 'vendor.js'),
        app: helpers.root('src', 'client', 'main.js'),
    },
    externals: [],
    plugins: [
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
        new HtmlWebpackPlugin(
            {
                template: helpers.root('src', 'client', 'index.html')
            }
        )


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
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true
                    }
                }
            },
            /*
            {
                test: /\.html$/,
                loader: 'html-loader'
            },            */


            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            //{
            //    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //    loader: 'file-loader?name=assets/[name].[hash].[ext]'
            //},
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/,
                    /node_modules/
                ],
                // use and query not allowed together, so we have to use a sub
                // object
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        //name: 'media/[name].[ext]'
                        name: 'media/[name].[hash:8].[ext]'
                    }
                }
            },
        ]
    }
};
