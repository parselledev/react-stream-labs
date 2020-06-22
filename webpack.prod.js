const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // Can add some files to build

module.exports = {
  mode: 'production',
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
      template: './src/index.pug',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    // new AddAssetHtmlPlugin({ filepath: require.resolve('./some-file') }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash:5].css'
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  output: {
    filename: 'js/[name].[hash:5].js',
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
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
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
            loader: "babel-loader",
          }
        ]
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
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
            options: {sourceMap: false}
          },
        ]
      },

      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          },
          'sass-loader',
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // Compress JPEG images
                progressive: true,
                quality: [0.65]
              },
              optipng: { // Compress PNG images. optipng.enabled: false will disable optipng
                enabled: false,
              },
              pngquant: { // Compress PNG images
                quality: [0.65, 0.95],
                speed: 4
              },
              gifsicle: { // Compress GIF images
                interlaced: false,
              },
              webp: { // Compress JPG & PNG images into WEBP. the webp option will enable WEBP
                quality: [0.75]
              }
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
              name: 'fonts/[name].[hash:5].[ext]'
            }
          }
        ]
      }
    ]
  }
};