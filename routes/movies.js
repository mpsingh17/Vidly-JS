const express       = require('express'),
      router        = express.Router(),
      movieDebugger = require('debug')('app:movie'),
      {Movie}         = require('../models/movie'),
      {Genre}       = require('../models/genre'),
      movieLib      = require('../libraries/movie') ;

/**
 * GET: /api/movies
 * It will send array of objects of movies
 */
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('genre', 'name -_id') ;
    return res.send(movies) ;
  }
  catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * GET: /api/genres/{id}
 * It will send object of single genre
 */
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('genre', 'name -_id') ;
    return res.send(movie) ;
  }
  catch (error) {
    return res.send(error.message) ;  
  }
}) ;

/**
 * POST: /api/movies
 * Create movie object and save to movies collection
 */
router.post('/', async (req, res) => {
  try {
    const validReqData = await movieLib.validateMovieReqBody(req.body) ;
    
    const genre = await Genre.findById(req.body.genre) ;
    if (genre === null) return res.status(400).send('Invalid genre') ;

    const movie = await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }) ;
    return res.send(movie) ;
  } 
  catch (error) {
    return res.send(error.message) ;
  }
}) ;

/**
 * PUT: /api/genres/{id}
 * It will update a genre object if valid.
 */
router.put('/:id', async (req, res) => {
  try {
    const validaReqData = await movieLib.validateMovieReqBody(req.body) ;
    
    const genre = await Genre.findById(req.body.genre) ;
    if (genre === null) return res.status(400).send('Invalid genre') ;

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, {new : true}) ;
    return (updatedMovie === null) ? res.status(404).send('Movie not found') : res.send(`${updatedMovie.title} has been updated.`) ;
  }
  catch (error) {
    return res.send(error.message) ;
  }
} ) ;

/**
 * DELETE: /api/genres/{id}
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id) ;
    return (deletedMovie === null) ? res.status(404).send('Movie not found') : res.send(`${deletedMovie.title} has been deleted`) ;
  }
  catch (error) {
    return res.send(error.message) ;
  }
} ) ;

module.exports = router ;