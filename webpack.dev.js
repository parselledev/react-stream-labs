const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // Can add some files to build

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  },
  entry: ['@babel/polyfill', './src/index.js'],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Output Management',
      template: './src/index.pug'
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    })
    // new AddAssetHtmlPlugin({ filepath: require.resolve('./some-file') }),
  ],
  devtool: 'eval-source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Redux: path.resolve(__dirname, 'src/redux/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: false
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
        ]
      },

      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              resources: './src/styles/abstract/@module.sass'
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/styles/abstract/@module.sass'
            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};