const webpack = require('webpack');
const path = require('path');

module.exports = 
{
    entry: 
    [
        // bundle the client for webpack-dev-server and connect to the provided endpoint.
        // for development, connect to http://localhost:8080/ to use webpack features
        'webpack-dev-server/client?http://localhost:8080',

        // bundle the client for hot reloading; only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // react-hot-loader is used to preserve component states when hot reloading
        'react-hot-loader/patch',

        // entry point for this app
        './src/app/app.js',
    ],

    output:
    {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        publicPath: '/',
    },

    // more accurate source map for debugging
    // see https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',

    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'babel-loader',
                        options:
                        {
                            presets:
                            [
                                'env',
                                'react',
                                'stage-2',
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: 
                [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                    { loader: 'postcss-loader' },
                ],
                include:
                [
                    path.resolve(__dirname, './src/app/static/styles')
                ]
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, './src/app/static/img/icons'),
                use: [ 'raw-loader' ]
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: 
                [
                    path.resolve(__dirname, './src/app/static/img'),
                    path.resolve(__dirname, './src/app/static/styles/fonts')
                ],
                use: [ 'url-loader?limit=10000' ]
            }
        ]
    },
    plugins:
    [
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
    ],
}

