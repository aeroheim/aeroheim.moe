const express = require('express');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');
const log = require('./log');
const blog = require('./api/blog');

function logError(error)
{
    if (error !== undefined && error !== null)
    {
        console.log(error);
    }
}

function initializeStoreFromDisk(store, path)
{
    store.insert(JSON.parse(fs.readFileSync(path, 'utf8')), (err) => logError(err));
}

module.exports = (PORT) => 
{
    const db = {};
    db.blog = new Datastore();
    initializeStoreFromDisk(db.blog, blog.storePath);

    const app = express();
    app.locals.db = db;

    app.use(log.morgan);
    app.get('*.js', (req, res, next) =>
    {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });

    app.use('/', express.static(path.join(__dirname, '../../dist/')));
    app.use('/', blog.router);

    app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, '..', 'favicon.ico')));
    app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.css')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

    app.listen(PORT);
};
