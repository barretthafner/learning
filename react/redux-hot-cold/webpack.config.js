var path = require('path')
var webpack = require('webpack');
var packageData = require('./package.json');
var filename = [packageData.name, 'js'];
var CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
  entry: path.resolve(__dirname, packageData.main),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: filename.join('.')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: "./build"
  },
  plugins: [
        new CopyWebpackPlugin([
          {from: 'src/index.html'},
          {from: 'src/reset.css', to: "reset.css"},
          {from: 'src/style.css', to: "style.css"}
        ])
    ]
}
