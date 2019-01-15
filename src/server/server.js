const path = require('path');
const fs = require('fs');
const express = require('express');
const Datastore = require('nedb');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config')('dev');
const WebpackDevServer = require ('webpack-dev-server');
const logger = require('./logger');
const blog = require('./api/blog');

function logError(err, msg)
{
    if (err)
    {
        logger.log('error', msg);
    }
}

function initializeStoreFromDisk(store, path)
{
    logger.log('info', `Initializing store for: ${path}`);

    // TODO: clear only data for related store.
    store.remove({}, { multi: true }, (err) => logError(err, `Failed to clear db store: ${err}`));
    store.insert(JSON.parse(fs.readFileSync(path, 'utf8')), (err) => logError(err, `Failed to populate db store: ${err}`));
}

function initializeDatabase()
{
    // initialize db
    const db = {};
    db.blog = new Datastore();
    initializeStoreFromDisk(db.blog, blog.storePath);

    // setup fs watcher for db
    const watcher = chokidar.watch('./content/**/*.json');
    watcher.on('change', (file) => 
    {
        console.log(file);
        const storeName = path.basename(file, '.json');
        if (storeName === 'blog')
        {
            logger.log('info', 'chokidar: blog.json modified');
            initializeStoreFromDisk(db.blog, blog.storePath);
        }
    });

    return db;
}

function listen(port)
{
    const db = initializeDatabase();

    // initialize express
    const app = express();
    app.locals.db = db;
    app.use(logger.logExpress);

    // apply routes/middleware
    app.get('*.js', (req, res, next) =>
    {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
        next();
    });

    app.use('/', express.static(path.join(__dirname, '../../dist/')));
    app.use('/', blog.router);
    app.get('/favicon*', (req, res) => res.sendFile(path.join(__dirname, '..', req.path)));
    app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.css')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

    app.listen(port);
}

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production')
{
    listen(PORT);
}
else
{
    listen(PORT - 1);

    // proxy all webpack-dev-server requests to the server
    const devServerOptions = {
      contentBase: './dist',
      hot: true,
      host: 'localhost',
      proxy:
      {
          '*' : `http://localhost:${PORT - 1}`
      },
    };

    // see https://webpack.js.org/guides/hot-module-replacement/
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
    const webpackDevServer = new WebpackDevServer(webpack(webpackConfig), devServerOptions);
    webpackDevServer.listen(PORT, 'localhost');
}
