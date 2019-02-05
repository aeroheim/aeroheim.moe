import winston from 'winston';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const logsDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

winston.configure({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: false,
      timestamp: true,
      json: false,
      handleExceptions: true,
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

winston.stream = {
  write(message) {
    winston.info(message);
  },
};

export default morgan('short', { stream: winston.stream });
