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
  findGenre(req.params.id)
    .then( (genre) => {
      return res.send(genre) ;
    } )
    .catch( (error) => {
      return res.send(error) ;
    } ) ;
}) ;

/**
 * POST: /api/genres
 * It will create a genre and push it to genres array.
 */
router.post('/', (req, res) => {
  validateReqBody(req.body)
    .then( (result) => {
      const genre = {
        id:   genres.length + 1,
        name: result.genreName
      } ;
      // Add to genres array.
      genres.push(genre) ;
      return res.send(genre) ;
    } )
    .catch( (result) => {
      return res.send( result.error.details[0].message ) ;
    } ) ;
}) ;

/**
 * PUT: /api/genres/{id}
 * It will update a genre object if valid.
 */
router.put('/:id', (req, res) => {
  async function processPutReq() {
    try {
      const genre        = await findGenre(req.params.id) ;
      const validReqData = await validateReqBody(req.body) ;
      genre.genreName    = validReqData.genreName ;
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
  const genre = findGenre(req.params.id) ;
  if (! genre) return res.status(404).send('Genre not found') ;
  
  const genreIndex   = genres.indexOf(genre) ;
  genres.splice(genreIndex, 1) ;
  
  return res.send( genre ) ;
} ) ;

//------------------ Helper function ------------------------//
function findGenre(id) {
  return new Promise(function(resolve, reject) {
    const genre = genres.find( (g) => {
      return g.id === Number.parseInt(id) ;
    } ) ;
    if( genre === undefined ) reject( new Error('Genre not found') ) ;
    resolve(genre) ;
  }) ;
}

function validateReqBody(body) {
  return new Promise( (resolve, reject) => {
    const schema = {
      genreName: Joi.string().min(2).max(7).required()
    } ;
    const result = Joi.validate(body, schema) ;
    result.error === null ? resolve(result) : reject( new Error(result.error.details[0].message) ) ;
  } ) ;  
}

module.exports = router ;