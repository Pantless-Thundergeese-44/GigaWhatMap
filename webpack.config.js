// import HtmlWebPackPlugin from 'html-webpack-plugin';
const HtmlWebPackPlugin = require('html-webpack-plugin');
// import CopyPlugin from 'copy-webpack-plugin';
const CopyPlugin = require('copy-webpack-plugin');
// import path from 'path';
const path = require('path');
// https://www.npmjs.com/package/concurrently // What concurrently does

module.exports = {
  mode: 'development',
  //entry set to WHATEVER the file is that holds all of the front-end logic (index.js is common)
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, //this will delete our dist/bundle.js after we stop running.
  },
  devtool: 'eval-source-map',
  module: {
    //each rule will scan the dist folder
    //and evaluate the contents of a given module based on
    //the 'test' key, which is usually a regex expression
    //eg, need rules for js/jsx, json, scss/sass, others?
    //TODO: add rules for any other filetypes we don't have yet
    rules: [
      //babel loaders:
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { targets: 'defaults' }],
              ],
            },
          },
        ],
      },
      //json loader:
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        //assets module: deals with static files}
      },
      //CSS & SCSS & SASS loaders:
      {
        test: /\.s[ac]ss$/i, //matches .scss, and .sass files (do we need to modify this for normal css??)
        use: [
          //Creates 'style' nodes from JS strings
          'style-loader',

          //Translates CSS into CommonJS (?)
          'css-loader',

          //Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './client/styles.scss' }],
    }),
  ],

  //configure the webpack development environment server '
  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
    },
    static: {
      publicPath: '/',
      directory: path.join(__dirname, 'dist'),
    },
    // compress: true,
    port: 8080,
  },
};
