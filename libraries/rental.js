const Joi = require('joi'),
      rentalDebugger = require('debug')('app:rental') ;

module.exports = {
  rentalSchema: {
    customerId: Joi.string().required(),
    movieId:    Joi.string().required()
  },
  validateReqBody: function(body) {
    return new Promise((resolve, reject) => {
      const rentalSchema = {
        customerId: Joi.string().trim().required(),
        movieId:    Joi.string().trim().required()
      } ;
      const result = Joi.validate(body, rentalSchema) ;
      result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
    }) ; 
  }
} ;