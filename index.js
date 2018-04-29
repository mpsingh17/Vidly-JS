require('dotenv').config() ;
require('express-async-errors') ;

const express     = require('express'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      winston     = require('winston') ;

const app = express() ;
require('./startup/routes')(app) ;

winston.add(winston.transports.File, {filename: './logs/winston.log'}) ;

winston.handleExceptions(new winston.transports.File({filename: './logs/winston.log'})) ;

process.on('unhandledRejection', (ex) => {
  throw ex ;
}) ;

//---------- Connect to DB -----------------------//
require('./startup/db')() ;

//------------------------------------- Middlewares ------------------------------//



//--------------------- Routes Middlewares ---------------------//


// Running app at given port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;