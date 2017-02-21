const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    //appDirectory: fs.realpathSync(process.cwd()) + '/dist/'
    publicPathDev: '/',
    //publicPathProd: 'https://ckpinguin.github.io/react-boilerplate/dist/'
    publicPathProd: './' // maybe '/dist/' ?
};

module.exports = {
    entry: {
        polyfills: path.resolve(PATHS.src, 'polyfills.js'),
        vendor: path.resolve(PATHS.src, 'vendor.js'),
        app: path.resolve(PATHS.src, 'main.js'),
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
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
            name: ['app', 'vendor', 'polyfills']
        }),
        // inject the resulting js and cs files
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('src', 'tsconfig.json') }
                } , 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            /**
            * The second pattern filters for component-scoped styles and loads
            * them as strings via the raw loader — which is what Angular expects
            * to do with styles specified in a styleUrls metadata property.
            */
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    }
};
