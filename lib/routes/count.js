var config = require('./../config'),
    MongoClient = require('mongodb').MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

module.exports.getCount = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                query = {},
                options = {};

            try {
                query = JSON.parse(req.params.Query);
                options = JSON.parse(req.params.Options);

                collection.count(query, options, function(err, count) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(count);
                    }

                    db.close();
                });

            } catch (error) {
                res.send(error);
            }
        }
    });
};