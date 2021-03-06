const path = require('path');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const PropertiesReader = require('properties-reader');

const properties = PropertiesReader('src/theme.properties');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './devel/main.js',
  output: {
    path: path.resolve(__dirname, './devel/dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  externals: {
    jquery: 'jQuery'
    // vue: {
    //   commonjs: 'vue',
    //   commonjs2: 'vue',
    //   amd: 'vue',
    //   root: 'Vue'
    // }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              syntax: 'scss',
              files: [path.resolve(__dirname, '../config/sassVars.js')]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.ts', 'tsx', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      GAMIFICATION_ENABLED: JSON.stringify(true)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
