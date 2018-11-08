const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputDirectoryName = 'dist';
if (__dirname.endsWith(outputDirectoryName))
{
    __dirname = __dirname.substr(0, __dirname.length - outputDirectoryName.length);
}

module.exports = [
    {
        name: 'client',
        entry: 
        [
            // bundle the client for webpack-dev-server and connect to the provided endpoint.
            // for development, connect to http://localhost:8080/ to use webpack features
            'webpack-dev-server/client?http://localhost:8080',

            // bundle the client for hot reloading; only hot reload for successful updates
            'webpack/hot/only-dev-server',

            // entry point for this app
            './src/app/app.js',
        ],
        output:
        {
            filename: 'bundle.js',
            path: path.resolve(outputDirectoryName),
            publicPath: '/',
        },
        target: 'web',
        mode: 'development',
        // more accurate source map for debugging
        // see https://webpack.js.org/configuration/devtool/
        devtool: 'eval-source-map',
        module:
        {
            rules:
            [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, './src'),
                    use:
                    [
                        { 
                            loader: 'babel-loader',
                            options:
                            {
                                presets:
                                [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins:
                                [
                                    '@babel/plugin-proposal-object-rest-spread',
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
                    use: 
                    [
                        { 
                            loader: 'babel-loader',
                            options:
                            {
                                presets:
                                [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins:
                                [
                                    '@babel/plugin-proposal-object-rest-spread',
                                ]
                            }
                        },
                        {
                            loader: 'react-svg-loader',
                            options:
                            {
                                svgo:
                                {
                                    plugins: [ { removeTitle: false }],
                                    floatPrecision: 2
                                }
                            }
                        }
                    ]
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
            new webpack.HotModuleReplacementPlugin(), // for HMR via node API
            new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
            new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'dev-bundle-report.html', openAnalyzer: false }),
        ],
    },
    {
        name: 'server',
        entry: './src/server/server.js',
        externals: [nodeExternals()],
        output:
        {
            filename: 'server.js',
            path: path.resolve(outputDirectoryName),
            publicPath: '/',
        },
        target: 'node',
        node:
        {
            __dirname: false,
        },
        mode: 'development',
        module:
        {
            rules:
            [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, './src'),
                    use:
                    [
                        { 
                            loader: 'babel-loader',
                            options:
                            {
                                presets:
                                [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins:
                                [
                                    '@babel/plugin-proposal-object-rest-spread',
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: 
                    [
                        { loader: 'isomorphic-style-loader' },
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
                    use: 
                    [
                        { 
                            loader: 'babel-loader',
                            options:
                            {
                                presets:
                                [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins:
                                [
                                    '@babel/plugin-proposal-object-rest-spread',
                                ]
                            }
                        },
                        {
                            loader: 'react-svg-loader',
                            options:
                            {
                                svgo:
                                {
                                    plugins: [ { removeTitle: false }],
                                    floatPrecision: 2
                                }
                            }
                        }
                    ]
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
        }
    },
]