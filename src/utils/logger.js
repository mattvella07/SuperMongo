var winston = require('winston');

var logger = new winston.Logger({
    transports: [
        new (winston.transports.File)({
            name: 'app-log',
            filename: 'supermongo.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-log',
            filename: 'supermongo-error.log',
            level: 'error'
        })
    ]
});

module.exports = logger;