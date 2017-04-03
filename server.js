var config = require('./lib/config'),
    routes = require('./lib/routes'),
    express = require('express'),
    helmet = require('helmet'),
    app = express();

//Serve static files
app.use(express.static('src'));
app.use(express.static('dist'));

//API routes
app.use(helmet());
app.use('/', routes);

//Start server
app.listen(config.express.port, function() {
   console.log('Listening on port ' + config.express.port); 
});