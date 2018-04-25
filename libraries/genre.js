const Joi = require('joi') ;

class Genre {
  constructor() {

  }

  // Validate request body for genre resource.
  validateReqBody(body) {
    return new Promise( (resolve, reject) => {
      const genreSchema = {
        name: Joi.string().min(2).max(7).required()
      } ;
      const result = Joi.validate(body, genreSchema) ;
      result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
    } ) ;  
  }
}

module.exports = new Genre() ;
