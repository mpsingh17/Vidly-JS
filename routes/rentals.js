const express           = require('express'),
      router            = express.Router(),
      rentalDebugger    = require('debug')('app:rental'),
      {Rental}          = require('../models/rental'),
      {Movie}           = require('../models/movie'),
      {Customer}           = require('../models/customer'),
      {validateReqBody} = require('../libraries/rental') ;

/**
 * GET: /api/rentals
 * Send all available rentals.
 */
router.get('/', async (req, res) => {
  const rentals = await Rental
    .find()
    .populate('customer', 'name -_id')
    .populate('movie', '-_id') ;

  return res.send(rentals) ;
}) ;

/**
 * POST: /api/rentals
 * Create rental
 */
router.post('/', async (req, res) => {
  const reqValidationResult = await validateReqBody(req.body) ;
  rentalDebugger('Validation result --> ', reqValidationResult) ;

  const customer = await Customer.findById(req.body.customerId) ;
  rentalDebugger('Customer value --> ', customer) ;
  if (customer === null) return res.status(400).send('Invalid Customer') ;

  const movie = await Movie.findById(req.body.movieId) ;
  rentalDebugger('Customer value --> ', movie) ;
  if (movie === null) return res.status(400).send('Invalid Movie') ;

  if (movie.numberInStock === 0) return res.send(`${movie.title} is not avaiable.`) ;

  const rental = await Rental.create({
    customer: req.body.customerId,
    movie: req.body.movieId
  }) ;

  movie.numberInStock-- ;
  movie.save() ;
  
  return res.send(rental) ;
}) ;

module.exports = router ;