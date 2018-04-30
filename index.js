require('dotenv').config() ;

const express = require('express'),
      config  = require('config'),
      debug   = require('debug')('app:startup') ;

const app = express() ;

require('./startup/logging')() ;
require('./startup/httpLogging')(app) ;

require('./startup/db')() ;
require('./startup/routes')(app) ;
require('./startup/validation')() ;

// Running app at given port.
app.listen( config.get('port'), () => debug(`Server listening at localhost:${config.get('port')}...`) ) ;