var config = require('./../config'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

module.exports.updateItem = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                criteria = {},
                updatedItem = {},
                options = {};

            try {
                criteria = JSON.parse(req.params.Criteria);
                updatedItem = JSON.parse(req.params.UpdatedItem);
                options = JSON.parse(req.params.Options);

                //If user searches on the _id then make sure to convert the string value to an ObjectID value
                for(var k in criteria) {
                    if(k === "_id") {
                        criteria[k] = new mongo.ObjectID(criteria[k]);
                    }
                }

                collection.update(criteria, updatedItem, options, function(err, items) {
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