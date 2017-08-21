const config = require('./lib/config'),
      routes = require('./lib/routes'),
      express = require('express'),
      helmet = require('helmet'),
      app = express(),
      logger = require('./src/utils/logger');

//Serve static files
app.use(express.static('src'));
app.use(express.static('dist'));

//API routes
app.use(helmet());
app.use('/', routes);

//Start server
app.listen(config.express.port, function() {
    logger.info('Listening on port ' + config.express.port);
    console.log('Listening on port ' + config.express.port); 
});