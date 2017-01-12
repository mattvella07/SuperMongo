var router = require('express').Router(),
    databases = require('./databases'),
    collections = require('./collections'),
    find = require('./find'),
    count = require('./count'),
    insert = require('./insert'),
    remove = require('./remove');

//API Routes
router.get('/api/databases', databases.getAll);
router.get('/api/collections/:DBName', collections.getAll);
router.get('/api/find/:DBName/:ColName/:Query/:Projection/:Options', find.query);
router.get('/api/count/:DBName/:ColName/:Query/:Options', count.getCount);
router.post('/api/insert/:DBName/:ColName/:NewItem', insert.insertOne);
router.post('/api/remove/:DBName/:ColName/:ItemToDelete', remove.removeOne);

module.exports = router;