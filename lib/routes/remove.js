var config = require('./../config'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

module.exports.removeOne = function(req, res) {
    MongoClient.connect(dbUrl + req.params.DBName, function(err, db) {
        if(err) {
            res.send(err);
        } else {
            var collection = db.collection(req.params.ColName),
                itemToDelete = {},
                justOne = {};

            try {
                itemToDelete = JSON.parse(req.params.ItemToDelete);
                justOne = JSON.parse(req.params.JustOne);

                //If user want to remove on the _id then make sure to convert the string value to an ObjectID value
                for(var k in itemToDelete) {
                    if(k === "_id") {
                        itemToDelete[k] = new mongo.ObjectID(itemToDelete[k]);
                    }
                }

                collection.remove(itemToDelete, justOne, function(err, result) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(result);
                    }

                    db.close();
                });
            } catch(error) {
                res.send(error);
            }
        }
    });
};