const path = require('path');

// Extract styles into a dedicated file in production so they aren't dependant on JS.
// See https://github.com/webpack-contrib/sass-loader for more details.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin(
{
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV !== "production"
});

module.exports = 
{
    entry: './src/app/app.js',
    target: 'web',
    output:
    {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: 
                [
                    /node_modules/
                ],
                use:
                [
                    {
                        loader: "babel-loader",
                        options:
                        {
                            presets:
                            [
                                'es2015',
                                'react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/app/static/css'),
                use: extractSass.extract(
                {
                    use:
                    [ 
                        {
                            loader: 'css-loader',
                            options:
                            {
                                modules: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpg|png|svg)$/,
                include: path.resolve(__dirname, './src/app/static/img'),
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [ extractSass ],
    devtool: 'source-map'
}