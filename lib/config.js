//const keytar = require('keytar');
var config = module.exports;

//console.log(keytar.getPassword('LinkNetMoto', 'LinkNetMoto'));

config.express = {
    port: process.env.EXPRESS_PORT || 3000
};

config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost'
};

//With username and password: mongodb://username:password@localhost:27017/exampledatabase