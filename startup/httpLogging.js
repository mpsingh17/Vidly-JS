const winston = require('winston'),
      morgan  = require('morgan') ;

module.exports = function(app) {
  if (app.get('env') === 'development') {
    app.use(morgan('tiny')) ;
    winston.info('Morgan is enabled.') ;
  }
}