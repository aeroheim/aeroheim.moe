const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const Datastore = require('nedb');
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

module.exports = (PORT) => 
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

    // initialize express server
    const app = express();
    app.locals.db = db;
    app.use(logger.logExpress);

    // apply routes/middleware
    app.get('*.js', (req, res, next) =>
    {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });
    app.use('/', express.static(path.join(__dirname, '../../dist/')));
    app.use('/', blog.router);
    app.get('/favicon*', (req, res) => res.sendFile(path.join(__dirname, '..', req.path)));
    app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.css')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

    app.listen(PORT);
};
