// webpack 2 configuration
// https://webpack.js.org/guides/migrating/

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
	watch: true,
  inline: true,
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './app'),
    ],
    //http://webpack.github.io/docs/configuration.html#resolve-alias
    alias: {
      lib: path.resolve('./lib'),
      res: path.resolve('./res'),
      style: path.resolve('./style'),
      //make sure it can be load by 'jquery'
      jquery$: 'jquery',
      // 01/26/2017 http://isotope.metafizzy.co/extras.html#webpack
      masonry: 'masonry-layout',
      isotope: 'isotope-layout'
    },
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devtool: 'source-map', 
  target: 'web', // enum

	entry: {
    // entry points
    app: path.resolve('./app') + '/' + 'main.js',
    //for basic stable library only
    vendor: ['babel-polyfill', 'jquery', 'lodash', 'react', 'react-dom', 'bootstrap-sass', path.resolve('./app') + '/' + 'vendor.js'],
  },
  output: {path: path.resolve('./script'), publicPath:'script/', filename: '[name].js', /*chunkFilename: '[id].js'*/},
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        // test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        // loader: 'file'
        // https://github.com/webpack/webpack/issues/597
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      // NOTICE: png / jpg needs specific loaders, see https://github.com/webpack-contrib/css-loader
      {
        test: /\.png$/,
        loader: 'url-loader', 
        options: {limit: 100000},
      },
      {
        test: /\.jpg$/,
        loader:'file-loader'
      },
      {
        test: /\.s?css$/,
        // https://css-tricks.com/css-modules-part-2-getting-started/
        // css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }
    ]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.js'}),
    //export to global for bootstrap and etc. (needs jquery ^2.0)
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    }),
    // http://webpack.github.io/docs/stylesheets.html
    // https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle
    new ExtractTextPlugin({filename: '[name].css'}),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        // for @import path in the style file
        sassLoader: {includePaths: [path.resolve('./style') + '/']}
      }
    }),
  ]
};