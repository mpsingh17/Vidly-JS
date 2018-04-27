const express       = require('express'),
      router        = express.Router(),
      Joi           = require('joi'),
      mongoose      = require('mongoose'),
      dbDebugger    = require('debug')('app:db'),
      genreDebugger = require('debug')('app:genre'),
      {Genre}       = require('../models/genre'),
      GenreLib      = require('../libraries/genre') ;

/**
 * GET: /api/genres
 * It will send array of objects of genres
 */
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find() ;
    return res.send(genres) ;
  }
  catch(err) {
    return res.status(404).send(err) ;
  }
}) ;

/**
 * GET: /api/genres/{id}
 * It will send object of single genre
 */
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id) ;
    return res.send(genre) ;
  } 
  catch(err) {
    return res.status(404).send(err.message) ;
  }
}) ;

/**
 * POST: /api/genres
 * It will create a genre and push it to genres array.
 */
router.post('/', async (req, res) => {
  try {
    const validReqData = await GenreLib.validateReqBody(req.body) ;
    const genre =  await new Genre( {name: validReqData.name} ).save() ;
    return res.send(genre) ;
  }
  catch(error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * PUT: /api/genres/{id}
 * It will update a genre object if valid.
 */
router.put('/:id', async (req, res) => {
  try {
    const validReqData = await GenreLib.validateReqBody(req.body) ;    
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}) ;
    return res.send(genre) ;
  } 
  catch(error) {
    return res.send(error.message) ;
  }
} ) ;

/**
 * DELETE: /api/genres/{id}
 */
router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove( req.params.id ) ;
    return (genre === null) ? res.status(404).send('Genre not found.') : res.send(`${genre.name} genre has been deleted.`);
  }
  catch (error) {
    return res.status(404).send(error.message) ;
  }
} ) ;

module.exports = router ;