const express = require('express');
const path = require('path');

module.exports = (PORT) => 
{
    const backend = express();
    backend.get('*', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '..', 'index.html'), {}, (error) => 
        { 
            if (error !== undefined)
            {
                console.log(error)
            }

            res.end();
        });
    });

    backend.listen(PORT);
};
