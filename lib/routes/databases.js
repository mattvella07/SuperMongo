var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

module.exports.getAll = function getAll(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
        if(err) {
            res.send(err); 
        } else {
            db.admin().listDatabases(function(err, dbs) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(dbs.databases);
                }
                db.close();
            }); 
            
        }
    });
};