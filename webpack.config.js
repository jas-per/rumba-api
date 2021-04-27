'use strict';

const webpack = require('webpack'), path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserPlugin = require("terser-webpack-plugin"),
      CopyPlugin = require("copy-webpack-plugin"),
      BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: 'index.html'
  }),
  new CopyPlugin({
    patterns: [{
      from: "resources",
      to: path.join(__dirname, '..', 'SDtest', 'api', 'dist', 'resources')
    }],
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    APP_META: JSON.stringify(require('./package.json'))
  })
]

const productionMode = process.env.NODE_ENV == 'production';
if (productionMode) {
  plugins.push(new MiniCssExtractPlugin())
} else if (process.env.NODE_ENV == 'analyse') {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  mode: productionMode ? "production" : "development",
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: { import: './index.js', dependOn: 'common' },
    common: ['preact','mobx','mobx-react-lite','mobx-state-tree','wouter-preact','react-bootstrap','react-xml-viewer'],
  },
  optimization: {
    splitChunks: {
      minSize: {
        javascript: 50000},
    },
    minimize: productionMode,
    ...(productionMode ? {minimizer:[new TerserPlugin({extractComments: false})]} : {})
  },
  module: {
    rules: [
        {
          test: /\.jsx?/i,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
              presets: [
                ['@babel/env', {
                  targets: {
                    esmodules: true
                  }
                }]
              ],
              plugins: [
                  ['@babel/transform-react-jsx',
                    { 
                      runtime: "automatic",
                      importSource: "preact"
                    }
                  ]
              ]
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            productionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            productionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ],
        }
    ]
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      },
    fallback: {
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer/')
    }
  },
  output: {
    path: path.join(__dirname, '..', 'SDtest', 'api', 'dist'),
    // path: path.join(__dirname, '..', 'rumba-server', 'api'),
    pathinfo: true // output debug path info
  },

  devServer: {
    historyApiFallback: true
  },

  plugins

};
