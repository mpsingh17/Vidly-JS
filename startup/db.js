const mongoose    = require('mongoose'),
      config      = require('config'),
      winston     = require('winston') ;

module.exports = function() {
  if ( process.env.NODE_ENV === 'development' ) {
    mongoose
      .connect( 'mongodb://' + config.get('dbConfig.hostName') + '/' + config.get('dbConfig.dbName') )
      .then( () => winston.info(`Connected to ${config.get('dbConfig.dbName')}...`) ) ;
  }
} 