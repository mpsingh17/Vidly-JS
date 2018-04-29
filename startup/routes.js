const express     = require('express'),
      morgan      = require('morgan'),
      genres      = require('../routes/genres'),
      customers   = require('../routes/customers'),
      movies      = require('../routes/movies'),
      rentals     = require('../routes/rentals'),
      error       = require('../middlewares/error'),
      logStream   = require('../middlewares/logger') ;


module.exports = function(app) {
  app.use(morgan('tiny', {stream: logStream})) ; // Log all http requests.
  app.use(express.json()) ; // Parse request body to JSON.
  app.use('/api/genres', genres) ;
  app.use('/api/customers', customers) ;
  app.use('/api/movies', movies) ;
  app.use('/api/rentals', rentals) ;
  app.use(error) ;
}