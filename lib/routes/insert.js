var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;
    
module.exports.insertOne = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                newItem = {};
            
            try {
                newItem = JSON.parse(req.params.NewItem);

                collection.insert(newItem, function(err, item) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(item);
                    }
                    
                    db.close();
                });
                
            } catch (error) {
                res.send(error);
            }
        }
    });
};