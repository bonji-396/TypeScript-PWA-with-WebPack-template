const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.ts',
    'service-worker': './src/service-worker.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Dart Sass を使用
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
      },
      {
        directory: path.resolve(__dirname, 'public'),
      },
    ],
    port: 8080,
    hot: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval'; object-src 'self'",
    },
  },
  mode: 'development',
  devtool: 'inline-source-map',
};