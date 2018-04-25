const mongoose = require('mongoose') ;

const genreSchema = new mongoose.Schema( {
	name: {
		type: String,
		required: true
	} 
} ) ;

const genreModel = mongoose.model( 'Genre', genreSchema ) ;
module.exports = genreModel ;