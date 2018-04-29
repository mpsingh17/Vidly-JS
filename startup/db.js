const mongoose    = require('mongoose'),
      config      = require('config'),
      dbDebugger  = require('debug')('app:db') ;

module.exports = function() {
  if ( process.env.NODE_ENV === 'development' ) {
    mongoose
      .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
      .then( () => { dbDebugger(`Connected to ${config.get('dbConfig.dbName')}...`) } )
      .catch( (err) => { dbDebugger('Could not connect...', err) } ) ;
  }
} 