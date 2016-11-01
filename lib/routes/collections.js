var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;
    
module.exports.getAll = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            db.listCollections().toArray(function(err, items) {
                if(err) {
                    res.send(err); 
                } else {
                    res.json(items);
                }
                db.close();
            });
            
        }
    });
};