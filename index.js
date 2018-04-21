const express = require('express'),
      Joi     = require('joi') ;

const app = express() ;

//------------------------------------- Middlewares ------------------------------//
app.use(express.json()) ;

// Temporary in memory database.
const genres = [
    'Comedy', 'Action', 'Drama'
] ;


// Send all genres.
app.get('/api/genres', (req, res) => { 
    return res.send(genres) ;
}) ;

// Send {id} specific genre.
app.get('/api/genres/:id', (req, res) => {
	if ( Number.parseInt(req.params.id) <= genres.length ) {
		return res.send(genres[req.params.id - 1]) ;
	}
	return res.send('Index out of range') ;
}) ;

// Create genre.
app.post('/api/genres', (req, res) => {
    const schema = {
      genreName: Joi.string().min(2).max(7).required()
    } ;
		const result = Joi.validate(req.body, schema) ;
		
    if (result.error === null) {
			// Extract genre name.
			const genreName = req.body.genreName ;
			// Add to genres array.
			genres.push(genreName) ;

			return res.send(genreName) ;	
		} else {
			return res.send(result.error.details[0].message) ;
		}
}) ;

// Update genre.
app.put( '/api/genres/:id', (req, res) => {
	if ( ! (Number.parseInt(req.params.id) <= genres.length) ) {
		return res.send('Index out of range') ;
	}
	const schema = {
		genreName: Joi.string().min(2).max(7).required()
	} ;
	const result = Joi.validate(req.body, schema) ;
	if ( result.error === null ) {
		genres[req.params.id - 1] = req.body.genreName ;
	} else {
		return res.send( result.error.details[0].message ) ;
	}
	return res.send( genres[req.params.id - 1] ) ;
} ) ;

// Delete genre.
app.delete( '/api/genres/:id', (req, res) => {
	if ( ! (Number.parseInt(req.params.id) <= genres.length) ) {
		return res.send('Index out of range') ;
	}
	const updatedGenres = genres.splice( req.params.id - 1, 1 ) ;
	return res.send( updatedGenres ) ;
} ) ;

// Ruuning app at 3000 port.
const PORT = 3000 ;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`) ;
}) ;