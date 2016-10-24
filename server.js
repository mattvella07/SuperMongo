var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    app = express();
var dbUrl = 'mongodb://localhost:27017/',
    port = 3000;

app.use(express.static('src'));
app.use(express.static('dist'));

app.get('/api/databases', function(req, res) {
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

app.get('/api/collections/:DBName', function(req, res) {
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

app.get('/api/find/:DBName/:ColName/:Query/:Projection/:Options', function(req, res) {
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

app.listen(port, function() {
   console.log('Listening on port ' + port); 
});