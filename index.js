require('dotenv').config() ;

const express     = require('express'),
      Joi         = require('joi'),
      mongoose    = require('mongoose'),
      config      = require('config'),
      appDebugger = require('debug')('app:startup'),
      dbDebugger  = require('debug')('app:db'),
      morgan      = require('morgan'),
      rfs         = require('rotating-file-stream'),
      fs          = require('fs'),
      path        = require('path'),
      genres      = require('./routes/genres') ;

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

/************** HTTP requests log enabled using morgan and rotating-file-stream **************/
const logDirectory = path.join(__dirname, 'logs') ;
fs.existsSync(logDirectory) || fs.mkdir(logDirectory) ;
const logStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
}) ;
app.use(morgan('tiny', {stream: logStream})) ; // Log all http requests.

//--------------------- Routes Middlewares ---------------------//
app.use('/api/genres', genres) ;

// Running app at given port.
app.listen( config.get('port'), () => {
  appDebugger(`Server listening at localhost:${config.get('port')}...`) ;
} ) ;