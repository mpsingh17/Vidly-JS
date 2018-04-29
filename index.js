require('dotenv').config() ;
require('express-async-errors') ;

const express     = require('express'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      dbDebugger  = require('debug')('app:db'),
      winston     = require('winston') ;

const app = express() ;
require('./startup/routes')(app) ;

winston.add(winston.transports.File, {filename: './logs/winston.log'}) ;

winston.handleExceptions(new winston.transports.File({filename: './logs/winston.log'})) ;

process.on('unhandledRejection', (ex) => {
  throw ex ;
}) ;

//---------- Connect to DB -----------------------//
if ( process.env.NODE_ENV === 'development' ) {
  mongoose
    .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
    .then( () => { dbDebugger(`Connected to ${config.get('dbConfig.dbName')}...`) } )
    .catch( (err) => { dbDebugger('Could not connect...', err) } ) ;
}

//------------------------------------- Middlewares ------------------------------//



//--------------------- Routes Middlewares ---------------------//


// Running app at given port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;