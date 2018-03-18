const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = 
{
    // entry point for this app
    entry: './src/app/app.js',

    output:
    {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        publicPath: '/',
    },

    mode: "production",

    // see https://webpack.js.org/configuration/devtool/
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
                        loader: "babel-loader",
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
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1, minimize: false } },
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        // gzip bundled output 
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
}

