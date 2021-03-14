const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const doNothing = (f) => f;

const config = {
  entry: {
    app: './src/app/client.tsx',
  },
  target: 'web',
  devtool: isDevelopment ? 'cheap-module-source-map' : false,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  mode: process.env.NODE_ENV,
  output: {
    path: `${__dirname}/public`,
    filename: isDevelopment ? '[name].dev.js' : '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendor: {
          test: /\/node_modules\//,
          chunks: (chunk) => /^app$/.test(chunk.name),
          name: 'vendor',
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /.(tsx|ts)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: './assets', to: './' }],
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].dev.css' : '[name].[contenthash].css',
    }),
    isProduction
      ? new CompressionPlugin({
          filename: '[path][base].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      : doNothing,
    isProduction
      ? new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      : doNothing,
  ],
};

module.exports = config;
