const Joi = require('joi') ;

class Movie {
  constructor() {}

  validateMovieReqBody(body) {
    return new Promise( (resolve, reject) => {
      const movieSchema = {
        title:           Joi.string().min(3).max(48).required(),
        genre:           Joi.string().max(24).required(),
        numberInStock:   Joi.number().positive().integer().required(),
        dailyRentalRate: Joi.number().positive().integer().required()
      }
      const result = Joi.validate(body, movieSchema) ;     
      result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
    } ) ;
  }
}

module.exports = new Movie() ;