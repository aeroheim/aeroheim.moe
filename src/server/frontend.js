const webpack = require('webpack');
const webpackConfig = require('../../webpack.dev');
const WebpackDevServer = require ('webpack-dev-server');

module.exports = (PORT) => 
{
    const frontend = new WebpackDevServer(webpack(webpackConfig), 
    {
        historyApiFallback: true,
        proxy: 
        {
            '*' : `http://localhost:${PORT - 1}`
        },
        hot: true,
    });

    frontend.listen(PORT, 'localhost');
};