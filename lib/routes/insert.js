const config = require('./../config'),
      format = require('./../helpers/format'),
      MongoClient = require('mongodb').MongoClient,
      dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`,
      logger = require('./../../src/utils/logger'),
      fs = require('fs');

module.exports.insertOne = function(req, res) {
    logger.info('insert insertOne');

    try {
        let newItem = JSON.parse(req.params.NewItem);
        insert(req.params.DBName, req.params.ColName, newItem, res);
    } catch(error) {
        logger.error('ERROR: ' + error);
        res.send(error);
    }
};

module.exports.insertFromFile = function(req, res) {
    logger.info('insert insertFromFile');
    // parmas = :DBName/:ColName/:File/:Mode

    let file = req.params.File;
    //Validate that file is JSON file 

    fs.readFile(file, (err, data) => {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        }

        let newData = JSON.parse(data);
    });
};

function insert(dbName, colName, newData, res) {
    MongoClient.connect(dbUrl + dbName, function(err, db) {
        if(err) {
            logger.error('ERROR: ' + err);
            res.send(err);
        } else {
            let collection = db.collection(colName);

            try {
                //Call formatObj to format data types such as _id or Date
                newData = format.formatObj(newData);

                collection.insert(newData, function(err, item) {
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
}