const express          = require('express'),
      router           = express.Router(),
      Joi              = require('joi'),
      customerDebugger = require('debug')('app:customer'),
      dbDebugger       = require('debug')('app:db'),
      {Customer}         = require('../models/customer'),
      CustomerLib      = require('../libraries/customer') ;

/**
 * GET: /api/customers 
 * Send list of customers.
 */
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find() ;
    return res.send(customers) ; 
  }
  catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * GET: /api/customers/:id
 * Send a ID specific customer.
 * @param id: mongoDB ObjectId.
 */
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id) ;
    return res.send(customer) ;
  } 
  catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * POST: /api/customers
 * Create a customer.
 */
router.post('/', async (req, res) => {
  try {
    const validReqData = await CustomerLib.validateCustomer(req.body) ;
    customerDebugger('Customer -> ', validReqData) ;
    
    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    }) ;
    customer.save() ;
    return res.send(customer) ;
    
  } catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * PUT: /api/customers/:id
 * Updates a customer based on ID.
 * @param id: mongoDB ObjectId.
 */
router.put('/:id', async (req, res) => {
  try {
    const validReqData    = await CustomerLib.validateCustomer(req.body) ;
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    }, {new: true}) ;
    customerDebugger('PUT: after update customer is --> ', updatedCustomer) ;
    return (updatedCustomer === null) ? res.status(404).send(`Customer with ID ${req.params.id} is not found.`) : res.send(updatedCustomer) ;
  }
  catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * DELETE: /api/customers/:id
 * Deletes a customer based on ID.
 * @param id: mongoDB ObjectId.
 */
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id) ;
    return (customer === null) ? res.status(404).send(`Customer with ID ${req.params.id} not found.`) : res.send(customer) ;
  }
  catch (error) {
    return res.status(404).send(error.message) ;  
  }
}) ; 

module.exports = router ;