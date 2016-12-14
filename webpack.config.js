module.exports =
{
    context: __dirname + "/app",
    entry: "./app.js",
    output:
    {
        filename: "bundle.js"
    },
    module:
    {
        loaders:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:
                {
                    presets: ['react']
                }
            }
        ]
    }
}