const express       = require('express'),
      router        = express.Router(),
      Joi           = require('joi'),
      mongoose      = require('mongoose'),
      Genre         = require('../models/Genre'),
      dbDebugger    = require('debug')('app:db'),
      genreDebugger = require('debug')('app:genre') ;

//------------------ In memory genres ---------------//
const genres = [
  { id: 1, genreName: 'Action' },
  { id: 2, genreName: 'Comedy' },
  { id: 3, genreName: 'Drama' }
] ;

/**
 * GET: /api/genres
 * It will send array of objects of genres
 */
router.get('/', (req, res) => {
  async function getAllGenres() {
    try {
      const genres = await Genre.find() ;
      return res.send(genres) ;
    }
    catch(err) {
      return res.status(404).send(err) ;
    }
  }
  getAllGenres() ;
}) ;

/**
 * GET: /api/genres/{id}
 * It will send object of single genre
 */
router.get('/:id', (req, res) => {
  async function getGenreByID() {
    try {
      const genre = await Genre.findById(req.params.id) ;
      return res.send(genre) ;
    } 
    catch(err) {
      return res.status(404).send(err.message) ;
    }
  }
  getGenreByID() ;
}) ;

/**
 * POST: /api/genres
 * It will create a genre and push it to genres array.
 */
router.post('/', (req, res) => {
  async function processPostReq() {
    try {
      const validReqData = await validateReqBody(req.body) ;
      genreDebugger('valid req data is ' , validReqData) ;

      const genre = new Genre( {
        name: validReqData.name
      } ) ;
      const result = await genre.save() ;
      return res.send(result) ;
    }
    catch(error) {
      genreDebugger('error is ' , error.message) ;
      return res.send(error.message) ;
    }
  }
  processPostReq() ;
}) ;

/**
 * PUT: /api/genres/{id}
 * It will update a genre object if valid.
 */
router.put('/:id', (req, res) => {
  async function processPutReq() {
    try {
      const validReqData = await validateReqBody(req.body) ;
      const genre        = await Genre.findById(req.params.id) ;
      genreDebugger(genre, ' --> ' , validReqData) ;
      genre.set( {
        name: validReqData.name
      } ) ;
      genre.save() ;
      genreDebugger(genre, ' --> ' , validReqData) ;
      return res.send(genre) ;
    } 
    catch(error) {
      return res.send(error.message) ;
    }
  }
  processPutReq() ;
} ) ;

/**
 * DELETE: /api/genres/{id}
 */
router.delete('/:id', (req, res) => {
  async function deleteGenre() {
    try {
      const genre = await Genre.findByIdAndRemove( req.params.id ) ;
      genreDebugger('genre is -->', genre) ;
      return (genre === null) ? res.status(404).send('Genre not found.') : res.send(`${genre.name} genre has been deleted.`);
    } catch (error) {
      return res.status(404).send(error.message) ;
    }
  }
  deleteGenre() ;
} ) ;

//------------------ Helper function ------------------------//
function validateReqBody(body) {
  return new Promise( (resolve, reject) => {
    const genreSchema = {
      name: Joi.string().min(2).max(7).required()
    } ;
    const result = Joi.validate(body, genreSchema) ;
    result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
  } ) ;  
}

module.exports = router ;