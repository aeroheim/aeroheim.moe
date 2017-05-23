const express = require('express');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');
const blog = require('./api/blog');

function logError(error)
{
    if (error !== undefined)
    {
        console.log(error);
    }
}

function loadJsonData(path, callback)
{
    return new Promise((resolve, reject) =>
    {
        fs.readFile(path, 'utf8', (err, data) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(JSON.parse(data));
            }
        });
    });
}

function initializeStoreFromDisk(store, path)
{
    store.remove({}, { multi: true }, (err, numRemoved) =>
    {
        if (err)
        {
            console.log('Failed to clear store for initialization.');
        }
        else
        {
            loadJsonData(path)
            .then((data) => store.insert(data))
            .catch((err) => console.log('Failed to load JSON data'));
        }
    });
}

module.exports = (PORT) => 
{
    const app = express();

    // Initialize in-memory database
    let db = {};
    db.bumps = new Datastore();
    db.blog = new Datastore();
    initializeStoreFromDisk(db.bumps, path.join(__dirname, '../../data/bumps', 'index.json'));
    initializeStoreFromDisk(db.blog, path.join(__dirname, '../../data/blog', 'index.json'));
    app.locals.db = db;

    // Apply routes
    app.use('/api', blog);
    app.get('/index.css', (req, res) =>
    {
        res.sendFile(path.join(__dirname, '..', 'index.css'), {}, (error) => 
        {
            logError(error);
            res.end();
        });
    });
    app.get('*', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '..', 'index.html'), {}, (error) => 
        { 
            logError(error);
            res.end();
        });
    });

    app.listen(PORT);
};
