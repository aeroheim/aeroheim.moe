const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logsDir = path.join(__dirname, '/../../logs');

if (!fs.existsSync(logsDir))
{
    fs.mkdirSync(logsDir);
}

winston.configure({
    transports:
    [
        new winston.transports.Console({
            level: 'debug',
            colorize: false,
            timestamp: true,
            json: false,
            handleExceptions: true
        }),
        new winston.transports.File({
            level: 'info',
            colorize: true,
            timestamp: true,
            json: false,
            maxFiles: 4,
            maxsize: 10 * 1024 * 1024,
            filename: path.join(logsDir, 'server.log'),
            handleExceptions: true,
        }),
    ],
});

winston.stream = 
{
    write: function(message, encoding)
    {
        winston.info(message);
    }
}

const morgan = require('morgan')('short', { stream: winston.stream });

module.exports =
{
    morgan: morgan,
}