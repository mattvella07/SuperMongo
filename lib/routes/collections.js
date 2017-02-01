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

module.exports.drop = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName);

            try {
                collection.drop(function(err, reply) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send(reply);
                    }
                    db.close();
                });
            } catch(error) {
                res.send(error);
            }
        }
    });
};

module.exports.add = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            try {
                db.createCollection(req.params.ColName, function(err, col) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send('success');
                    }
                    db.close();
                });
            } catch(error) {
                res.send(error);
            }
        }
    });
};