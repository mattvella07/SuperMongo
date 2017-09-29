const config = require('./../config'),
      MongoClient = require('mongodb').MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');

module.exports.getAll = function getAll(req, res) {
    logger.info('databases getAll');
    MongoClient.connect(dbUrl, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err); 
        } else {
            db.admin().listDatabases(function(err, dbs) {
                if(err) {
                    logger.error('ERROR - db.admin().listDatabases(): ' + err);
                    res.send(err);
                } else {
                    logger.info('success');
                    res.json(dbs.databases);
                }
                db.close();
            }); 
        }
    });
};
