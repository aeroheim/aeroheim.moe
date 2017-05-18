const express = require('express');
const path = require('path');
const blog = require('./api/blog');

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/aeroheim';

function logError(error)
{
    if (error !== undefined)
    {
        console.log(error);
    }
}

module.exports = (PORT) => 
{
    const app = express();

    MongoClient.connect(mongoUrl, (err, db) => 
    {
        if (err)
        {
            logError(err);
        }
        else
        {
            app.locals.db = db;
        }
    });

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
