const mongoose = require('mongoose'),
      config   = require('config'),
      debug    = require('debug')('app:startup') ;

module.exports = function() {
  if ( process.env.NODE_ENV === 'development' ) {
    mongoose
      .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
      .then( () => debug(`Connected to ${config.get('dbConfig.dbName')}...`) ) ;
  }
} 