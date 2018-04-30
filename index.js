require('dotenv').config() ;

const express = require('express'),
      config  = require('config'),
      winston = require('winston') ;

const app = express() ;

require('./startup/logging')() ;

require('./startup/db')() ;
require('./startup/routes')(app) ;
require('./startup/validation')() ;

// Running app at given port.
app.listen( config.get('port'), () => winston.info(`Server listening at localhost:${config.get('port')}...`) ) ;