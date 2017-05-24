const express = require('express');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');
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

    app.use('/', blog.router);
    

    app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.css')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

    app.listen(PORT);
};
