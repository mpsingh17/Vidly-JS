require('express-async-errors') ;
const winston = require('winston'),
      debug   = require('debug')('app:startup') ;

module.exports = function() {
  winston.add(winston.transports.File, {filename: '../logs/winston.log'}) ;
  
  winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename: './logs/winston.log'})
  ) ;
  
  process.on('unhandledRejection', (ex) => {
    throw ex ;
  }) ;
  debug('Winston is ready to handle exceptions.') ;
}