const config = require('./../config'),
      MongoClient = require('mongodb').MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');
    
module.exports.getAll = function(req, res) {
    logger.info('collections getAll');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            db.listCollections().toArray(function(err, items) {
                if(err) {
                    logger.error('ERROR - db.listCollections(): ' + err);
                    res.send(err); 
                } else {
                    logger.info('success');
                    res.json(items);
                }
                db.close();
            });
        }
    });
};

module.exports.drop = function(req, res) {
    logger.info('collections drop');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName);

            try {
                collection.drop(function(err, reply) {
                    if(err) {
                        logger.error('ERROR - collection.drop(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.send(reply);
                    }
                    db.close();
                });
            } catch(error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
};

module.exports.add = function(req, res) {
    logger.info('collections add');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            try {
                db.createCollection(req.params.ColName, function(err, col) {
                    if(err) {
                        logger.error('ERROR - db.createCollection(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.send('success');
                    }
                    db.close();
                });
            } catch(error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
};

module.exports.rename = function(req, res) {
    logger.info('collections rename');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName);

            try {
                collection.rename(req.params.NewColName, function(err, reply) {
                    if(err) {
                        logger.error('ERROR - collection.rename(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.send('success');
                    }
                    db.close();
                });
            } catch(error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
};