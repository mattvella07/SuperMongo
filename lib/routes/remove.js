var config = require('./../config'),
    format = require('./../helpers/format'),
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

                //Call formatObj to format data types such as _id or Date
                itemToDelete = format.formatObj(itemToDelete);

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