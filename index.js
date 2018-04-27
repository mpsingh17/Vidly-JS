require('dotenv').config() ;

const express     = require('express'),
      Joi         = require('joi'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      dbDebugger  = require('debug')('app:db'),
      morgan      = require('morgan'),
      logStream   = require('./middlewares/logger'),
      genres      = require('./routes/genres'),
      customers   = require('./routes/customers'),
      movies      = require('./routes/movies') ;


const app = express() ;

//---------- Connect to DB -----------------------//
if ( process.env.NODE_ENV === 'development' ) {
  mongoose
    .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
    .then( () => { dbDebugger(`Connected to ${config.get('dbConfig.dbName')}...`) } )
    .catch( (err) => { dbDebugger('Could not connect...', err) } ) ;
}

//------------------------------------- Middlewares ------------------------------//
app.use(express.json()) ; // Parse request body to JSON.
app.use(morgan('tiny', {stream: logStream})) ; // Log all http requests.

//--------------------- Routes Middlewares ---------------------//
app.use('/api/genres', genres) ;
app.use('/api/customers', customers) ;
app.use('/api/movies', movies) ;

// Running app at given port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;