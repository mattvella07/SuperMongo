const config = require('./../config'),
      format = require('./../helpers/format'),
      mongo = require('mongodb'),
      MongoClient = mongo.MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');

module.exports.find = function(req, res) {
    logger.info('find find');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                query = {},
                projection = {},
                options = {};
            
            try {
                query = JSON.parse(req.params.Query);
                projection = JSON.parse(req.params.Projection);
                options = JSON.parse(req.params.Options);

                //Call formatObj to format data types such as _id or Date
                query = format.formatObj(query);

                collection.find(query, projection, options).toArray(function(err, items) {
                    if(err) {
                        logger.error('ERROR - collection.find(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(items);
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

module.exports.findOne =  function(req, res) {
    logger.info('find findOne');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                query = {},
                projection = {},
                options = {};
            
            try {
                query = JSON.parse(req.params.Query);
                projection = JSON.parse(req.params.Projection);
                options = JSON.parse(req.params.Options);

                //Call formatObj to format data types such as _id or Date
                query = format.formatObj(query);

                collection.findOne(query, projection, options, function(err, items) {
                    if(err) {
                        logger.error('ERROR - collection.findOne(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(items);
                    }
                    
                    db.close();
                });
                
            } catch(error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
}

module.exports.count = function(req, res) {
    logger.info('find count');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                query = {},
                options = {};

            try {
                query = JSON.parse(req.params.Query);
                options = JSON.parse(req.params.Options);

                //Call formatObj to format data types such as _id or Date
                query = format.formatObj(query);

                collection.count(query, options, function(err, count) {
                    if(err) {
                        logger.error('ERROR - collection.count(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(count);
                    }

                    db.close();
                });

            } catch (error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
}

module.exports.distinct = function(req, res) {
    logger.info('find distinct');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                key = '';
                query = {};

            try {
                key = req.params.Field.toString();
                query = JSON.parse(req.params.Query);

                collection.distinct(key, query, function(err, items) {
                    if(err) {
                        logger.error('ERROR - collection.distinct(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(items);
                    }

                    db.close();
                });
            } catch(error) {
                logger.error('ERROR: ' + error);
                res.send(error);
            }
        }
    });
}
