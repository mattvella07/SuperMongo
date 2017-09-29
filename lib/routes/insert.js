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

    let file = req.params.File.toString();
    if(file.endsWith(".json")) {
        //Need to implement Mode parameter
        //Will it work with file in location other than project directory 

        fs.readFile(file, (err, data) => {
            if(err) {
                logger.error('ERROR: ' + err);
                res.send(err);
            } else {
                try {
                    let newData = JSON.parse(data);
                    insert(req.params.DBName, req.params.ColName, newData, res);
                } catch(error) {
                    logger.error('ERROR: ' + error);
                    res.send(error);
                }
            }
        });
    } else {
        logger.error('ERROR: Not a valid file type');
        res.send(new Error("Not a valid file type"));
    }
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
