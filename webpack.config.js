const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = {
  mode: 'development',
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, { 
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]_[hash][ext]'
        }
      },  
      {
        test: /\.(woff(2)?|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash][ext]'
        }
      },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}
