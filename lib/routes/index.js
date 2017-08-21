const router = require('express').Router(),
      databases = require('./databases'),
      collections = require('./collections'),
      find = require('./find'),
      insert = require('./insert'),
      remove = require('./remove'),
      update = require('./update');

//API Routes
router.get('/api/databases', databases.getAll);
router.get('/api/collections/:DBName', collections.getAll);
router.get('/api/find/:DBName/:ColName/:Query/:Projection/:Options', find.find);
router.get('/api/findOne/:DBName/:ColName/:Query/:Projection/:Options', find.findOne);
router.get('/api/count/:DBName/:ColName/:Query/:Options', find.count);
router.post('/api/insert/:DBName/:ColName/:NewItem', insert.insertOne);
router.post('/api/remove/:DBName/:ColName/:ItemToDelete/:JustOne', remove.removeOne);
router.post('/api/update/:DBName/:ColName/:Criteria/:UpdatedItem/:Options', update.updateItem);
router.post('/api/dropCollection/:DBName/:ColName', collections.drop);
router.post('/api/addCollection/:DBName/:ColName', collections.add);
router.post('/api/renameCollection/:DBName/:ColName/:NewColName', collections.rename);
router.get('/api/distinct/:DBName/:ColName/:Field/:Query', find.distinct);

module.exports = router;