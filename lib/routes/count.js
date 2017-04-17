var config = require('./../config'),
    format = require('./../helpers/format'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
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

                //Call formatObj to format data types such as _id or Date
                query = format.formatObj(query);

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