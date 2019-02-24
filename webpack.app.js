/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  name: 'app',
  entry: './src/app/app.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: { svgo: { plugins: [{ removeTitle: false }], floatPrecision: 2 } },
          },
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000'],
      },
    ],
  },
};

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // for HMR via node API
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'app-dev-bundle-report.html', openAnalyzer: false }),
  ],
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // gzip bundled output
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'app-prod-bundle-report.html', openAnalyzer: false }),
  ],
};

module.exports = env => (env === 'dev'
  ? Object.assign({}, config, devConfig)
  : Object.assign({}, config, prodConfig));
