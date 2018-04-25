const Joi              = require('joi'),
      customerDebugger = require('debug')('app:customer') ;

class Customer {
  constructor() {}

  validateCustomer(body) {
    const customerSchema = {
      name:   Joi.string().required().min(3).max(48).trim().lowercase().example('John'),
      phone:  Joi.string().required().min(10).max(10).trim(),
      isGold: Joi.boolean().required()
    } ;
    return new Promise( (resolve, reject) => {
      const result = Joi.validate(body, customerSchema) ;
      result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
    } ) ;
  }
}

module.exports = new Customer() ;