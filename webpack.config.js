const path = require('path');

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
                test: /\.css$/,
                include: path.resolve(__dirname, './src/app/static/css'),
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                include: path.resolve(__dirname, './src/app/static/img'),
                use: [ 'file-loader' ]
            }
        ]
    }
}