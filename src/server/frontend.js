const webpack = require('webpack');
const webpackConfig = require('../../webpack.dev');
const WebpackDevServer = require ('webpack-dev-server');

module.exports = (PORT) => 
{
    const frontend = new WebpackDevServer(webpack(webpackConfig), 
    {
        proxy: 
        {
            '*' : `http://localhost:${PORT - 1}`
        }
    });

    frontend.listen(PORT, 'localhost');
};