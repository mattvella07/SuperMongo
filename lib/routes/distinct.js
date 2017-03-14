var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

module.exports.getDistinct = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName);

            try {
                collection.distinct(req.params.Field.toString(), function(err, items) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(items);
                    }

                    db.close();
                });
            } catch(error) {
                res.send(error);
            }
        }
    });
};