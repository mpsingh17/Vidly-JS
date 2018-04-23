const express  = require('express'),
      Joi      = require('joi'),
      mongoose = require('mongoose'),
      config   = require('config'),
      genres   = require('./routes/genres') ;

const app = express() ;

//---------- Connect to DB -----------------------//
if ( process.env.NODE_ENV === 'development' ) {
  mongoose
    .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
    .then( () => { console.log(`Connected to ${config.get('dbConfig.dbName')}...`) } )
    .catch( (err) => { console.error('Could not connect...', err) } ) ;
}

//------------------------------------- Middlewares ------------------------------//
app.use(express.json()) ;

//--------------------- Routes ---------------------//
app.use('/api/genres', genres) ;

// Ruuning app at 3000 port.
app.listen( config.get('port'), () => {
  console.log(`Server listening at ${config.get('port')}...`) ;
} ) ;