const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const autoprefixer = require('autoprefixer');
const poststylus = require('poststylus');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: [
    path.join(__dirname, '/src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'static/js/bundle.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname + '/public/index.html'),
      filename: 'index.html' // in prod-mode, this file lands in the dist folder
    })
  ],
  stats: {
   colors: true,
   reasons: true
  },
  devServer: {
    contentBase: './public'
  },
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: path.join(__dirname, '/src/')
      }
    ],
    loaders: [
      // Default loader: load all assets that are not handled
      // by other loaders with the url loader.
      // Note: This list needs to be updated with every change of extensions
      // the other loaders match.
      // E.g., when adding a loader for a new supported file extension,
      // we need to add the supported extension to this loader too.
      // Add one new line in `exclude` for each loader.
      //
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      // {
      //   exclude: [ /\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.svg$/ ],
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: 'static/media/[name].[hash:8].[ext]'
      //   },
      //   test: /.+/
      // },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '/src/'),
        loader: 'babel',
        query: {
          babelrc: false, // ignore .babelrc presets
          presets: [ 'react', 'es2015' ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
      {
        test: /\.(pug|jade)$/,
        include: path.join(__dirname, '/src/'),
        loader: 'pug'
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      { test: /\.html$/, loader: 'html' },
      // stylus is handled in differently in prod/dev
      //{ test: /\.styl$/, loader: 'style!css!postcss!stylus' },

      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/, loader: 'json'
      },
      // "file" loader for svg
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  // stylus: {// postcss-cssnext includes autoprefixer, so it is not needed here
  //   use: [poststylus(['postcss-short', 'postcss-sorting', 'postcss-cssnext', 'rucksack-css'])]
  // }
};

const dev = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient')
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
      },
      {
        test: /\.styl$/,
        loader: 'style!css!postcss!stylus'
      },
    ]
  }
};

const prod = {
  module: {
    loaders: [
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, prod);
    break;
  default:
    config = merge(common, dev);
}

/** Extending the webpack-validator schema for special config stuff **/
const Joi = require('webpack-validator').Joi
// This joi schema will be `Joi.concat`-ed with the internal schema
const validatorSchemaExtension = Joi.object({
  // this would just allow the property and doesn't perform any additional validation
  stylus: Joi.any()
})

module.exports = validate(config, { schemaExtension: validatorSchemaExtension });
