const winston = require('winston') ;

module.exports = function(err, req, res, next) {
  /**
   * Logging levels in winston.
   * 1. error
   * 2. warn
   * 3. info
   * 4. verbose
   * 5. debug
   * 6. silly
   */
  winston.error(err.message, err) ;

  return res.status(500).send('Something broke!') ;
}