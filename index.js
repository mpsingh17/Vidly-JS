require('dotenv').config() ;

const express     = require('express'),
      Joi         = require('joi'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      dbDebugger  = require('debug')('app:db'),
      genres      = require('./routes/genres') ;

const app = express() ;

// process.env.NODE_ENV = 'development' ;
//---------- Connect to DB -----------------------//
if ( process.env.NODE_ENV === 'development' ) {
  mongoose
    .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
    .then( () => { dbDebugger(`Connected to ${config.get('dbConfig.dbName')}...`) } )
    .catch( (err) => { dbDebugger('Could not connect...', err) } ) ;
}

//------------------------------------- Middlewares ------------------------------//
app.use(express.json()) ;

//--------------------- Routes ---------------------//
app.use('/api/genres', genres) ;

// Ruuning app at 3000 port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;