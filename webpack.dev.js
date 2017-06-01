const webpack = require('webpack');
const path = require('path');

module.exports = 
{
    entry: 
    [
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8080/',

        // bundle the client for hot reloading
        // only - means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // entry point for this app
        './src/app/app.js',
    ],

    output:
    {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        publicPath: '/',
    },

    // generate full source-map for accurate debugging
    devtool: 'source-map',

    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    {
                        loader: 'babel-loader',
                        options:
                        {
                            presets:
                            [
                                'es2015',
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
                    { loader: 'style-loader'},
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
        // new webpack.NamedModulesPlugin(),
    ],
}

