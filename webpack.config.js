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
                exclude: /node_modules/,
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
                use: ['style-loader', 'css-loader'],
                include: /flexboxgrid/
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/app/static/styles'),
                use: 
                [ 
                    { loader: 'style-loader'} , 
                    { loader: 'css-loader', options: { modules: true } },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                include: path.resolve(__dirname, './src/app/static/img'),
                use: [ 'file-loader' ]
            }
        ]
    },
    devtool: 'source-map'
}