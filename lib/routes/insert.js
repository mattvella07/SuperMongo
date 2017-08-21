const config = require('./../config'),
      format = require('./../helpers/format'),
      MongoClient = require('mongodb').MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');
    
module.exports.insertOne = function(req, res) {
    logger.info('insert insertOne');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                newItem = {};
            
            try {
                newItem = JSON.parse(req.params.NewItem);

                //Call formatObj to format data types such as _id or Date
                newItem = format.formatObj(newItem);

                collection.insert(newItem, function(err, item) {
                    if(err) {
                        logger.error('ERROR - collection.insert(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(item);
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