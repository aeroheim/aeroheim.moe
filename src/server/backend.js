const express = require('express');
const path = require('path');

function logError(error)
{
    if (error !== undefined)
    {
        console.log(error);
    }
}

module.exports = (PORT) => 
{
    const backend = express();

    backend.get("/index.css", (req, res) =>
    {
        res.sendFile(path.join(__dirname, '..', 'index.css'), {}, (error) => 
        {
            logError(error);
            res.end();
        });
    });

    backend.get('*', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '..', 'index.html'), {}, (error) => 
        { 
            logError(error);
            res.end();
        });
    });

    backend.listen(PORT);
};
