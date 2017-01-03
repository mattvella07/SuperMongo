var config = require('./../config'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
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

                //If user searches on the _id then make sure to convert the string value to an ObjectID value
                for(var k in query) {
                    if(k === "_id") {
                        query[k] = new mongo.ObjectID(query[k]);
                    }
                }

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