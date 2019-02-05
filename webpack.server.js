/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputDirectoryName = 'dist';
if (__dirname.endsWith(outputDirectoryName)) {
  // eslint-disable-next-line no-global-assign
  __dirname = __dirname.substr(0, __dirname.length - outputDirectoryName.length);
}

const config = {
  name: 'server',
  entry: './src/server/server.jsx',
  output: {
    filename: 'server.js',
    path: path.resolve(outputDirectoryName),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
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
          { loader: 'node-style-loader' },
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
        include: [
          path.resolve(__dirname, './src/app/static/styles'),
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, './src/app/static/img/icons'),
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
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: [
          path.resolve(__dirname, './src/app/static/img'),
          path.resolve(__dirname, './src/app/static/styles/fonts'),
        ],
        use: ['url-loader?limit=10000'],
      },
    ],
  },
};

const devConfig = {
  mode: 'development',
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'server-dev-bundle-report.html', openAnalyzer: false }),
  ],
};

const prodConfig = {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'server-prod-bundle-report.html', openAnalyzer: false }),
  ],
};

module.exports = env => (env === 'dev'
  ? Object.assign({}, config, devConfig)
  : Object.assign({}, config, prodConfig));
