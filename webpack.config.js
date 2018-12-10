const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
require("@babel/polyfill");


module.exports = {
  entry: ['@babel/polyfill','./source/index.js'], // Entry point to pack
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js' // Output usable to add in our index.html
  },
  mode: 'development',
  module: {
   rules: [
     {
       test: /\.js$/, // Send any .js file (excluding node_modules) to babel compiler
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     },
     {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        'url-loader?limit=10000',
        {
          loader: 'img-loader',
          options: {
            outputPath: 'assets',
            name: '[name][hash].[ext]'
          }
        }
      ]
     },
     {
       test: /\.(svg)$/,
       use: [
         {
          loader: 'svg-url-loader',
          options: {
            noquotes: true,
          }
         }
       ]
     },
     {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader',  MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    {
      test: /\.(ttf|eot|otf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts',
            name: '[name][hash].[ext]'
          }
        }
      ]
    }
   ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./source/index.html",
      filename: "index.html",
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ]
};
