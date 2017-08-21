const config = require('./../config'),
      format = require('./../helpers/format'),
      mongo = require('mongodb'),
      MongoClient = mongo.MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');

module.exports.removeOne = function(req, res) {
    logger.info('remove removeOne');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                itemToDelete = {},
                justOne = {};

            try {
                itemToDelete = JSON.parse(req.params.ItemToDelete);
                justOne = JSON.parse(req.params.JustOne);

                //Call formatObj to format data types such as _id or Date
                itemToDelete = format.formatObj(itemToDelete);

                collection.remove(itemToDelete, justOne, function(err, result) {
                    if(err) {
                        logger.error('ERROR - collection.remove(): ' + err);
                        res.send(err);
                    } else {
                        logger.info('success');
                        res.json(result);
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