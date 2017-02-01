var router = require('express').Router(),
    databases = require('./databases'),
    collections = require('./collections'),
    find = require('./find'),
    count = require('./count'),
    insert = require('./insert'),
    remove = require('./remove'),
    update = require('./update');

//API Routes
router.get('/api/databases', databases.getAll);
router.get('/api/collections/:DBName', collections.getAll);
router.get('/api/find/:DBName/:ColName/:Query/:Projection/:Options', find.query);
router.get('/api/count/:DBName/:ColName/:Query/:Options', count.getCount);
router.post('/api/insert/:DBName/:ColName/:NewItem', insert.insertOne);
router.post('/api/remove/:DBName/:ColName/:ItemToDelete/:JustOne', remove.removeOne);
router.post('/api/update/:DBName/:ColName/:Criteria/:UpdatedItem/:Options', update.updateItem);
router.post('/api/dropCollection/:DBName/:ColName', collections.drop);
router.post('/api/addCollection/:DBName/:ColName', collections.add);

module.exports = router;