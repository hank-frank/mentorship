const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('This is info.');
logger.warn('This is a warning.');
logger.error('This is an error.');

module.exports = logger;