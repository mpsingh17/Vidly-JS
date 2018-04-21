const express = require('express'),
      Joi     = require('joi'),
      router  = express.Router() ;

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
  return res.send(genres) ;
}) ;

/**
 * GET: /api/genres/{id}
 * It will send object of single genre
 */
router.get('/:id', (req, res) => {
  const genre = findGenre(req.params.id) ;
  if (! genre) return res.status(404).send('Genre not found') ;

  return res.send(genre) ;
}) ;

/**
 * POST: /api/genres
 * It will create a genre and push it to genres array.
 */
router.post('/', (req, res) => {
  const schema = {
    genreName: Joi.string().min(2).max(7).required()
  } ;
  const result = Joi.validate(req.body, schema) ;
  
  if (result.error === null) {
    const genre = {
      id:   genres.length + 1,
      name: req.body.genreName
    } ;
    // Add to genres array.
    genres.push(genre) ;
    return res.send(genre) ;	
  } else {
    return res.send(result.error.details[0].message) ;
  }
}) ;

/**
 * PUT: /api/genres/{id}
 * It will update a genre object if valid.
 */
router.put('/:id', (req, res) => {
  // Find genre, if not present send 404.
  const genre = findGenre(req.params.id) ;
  if (! genre) return res.status(404).send('Genre not found') ;

  const schema = {
    genreName: Joi.string().min(2).max(7).required()
  } ;
  const result = Joi.validate(req.body, schema) ;

  if ( result.error === null ) {
    genre.name = req.body.genreName ;
    return res.send(genre) ;
  } else {
    return res.send( result.error.details[0].message ) ;
  }
} ) ;

/**
 * DELETE: /api/genres/{id}
 */
router.delete('/:id', (req, res) => {
  const genre = findGenre(req.params.id) ;
  if (! genre) return res.status(404).send('Genre not found') ;
  
  const genreIndex   = genres.indexOf(genre) ;
  genres.splice(genreIndex, 1) ;
  
  return res.send( genre ) ;
} ) ;

//------------------ Helper function ------------------------//
function findGenre(id) {
  const genre = genres.find( (g) => {
    return g.id === Number.parseInt(id) ;
  } ) ;
  if( genre === undefined ) return false ;
  return genre ;
}

module.exports = router ;