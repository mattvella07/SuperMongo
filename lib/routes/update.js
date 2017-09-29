const config = require('./../config'),
      format = require('./../helpers/format'),
      mongo = require('mongodb'),
      MongoClient = mongo.MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger');

module.exports.updateItem = function(req, res) {
    logger.info('update updateItem');
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                criteria = {},
                updatedItem = {},
                options = {};

            try {
                criteria = JSON.parse(req.params.Criteria);
                updatedItem = JSON.parse(req.params.UpdatedItem);
                options = JSON.parse(req.params.Options);

                //Call formatObj to format data types such as _id or Date
                criteria = format.formatObj(criteria);

                collection.update(criteria, updatedItem, options, function(err, items) {
                    if(err) {
                        logger.error('ERROR - collection.update(): ' + err);
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
