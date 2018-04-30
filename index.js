require('dotenv').config() ;
require('express-async-errors') ;

const express     = require('express'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      winston     = require('winston') ;

const app = express() ;

winston.add(winston.transports.File, {filename: './logs/winston.log'}) ;

winston.handleExceptions(new winston.transports.File({filename: './logs/winston.log'})) ;

process.on('unhandledRejection', (ex) => {
  throw ex ;
}) ;

require('./startup/db')() ;
require('./startup/routes')(app) ;

// Running app at given port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;