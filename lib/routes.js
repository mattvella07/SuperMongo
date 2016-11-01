var config = require('./config'),
    MongoClient = require('mongodb').MongoClient,
    router = require('express').Router(),
    dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/`;

router.get('/api/databases', function(req, res) {
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
});

router.get('/api/collections/:DBName', function(req, res) {
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
});

router.get('/api/find/:DBName/:ColName/:Query/:Projection/:Options', function(req, res) {
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
});

router.get('/api/count/:DBName/:ColName/:Query/:Options', function(req, res) {
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
});

module.exports = router;