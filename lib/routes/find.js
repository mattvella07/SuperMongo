var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;
    
module.exports.query = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
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

                collection.find(query, projection, options).toArray(function(err, items) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(items);
                    }
                    
                    db.close();
                });
                
            } catch (error) {
                res.send(error);
            }
        }
    });
};