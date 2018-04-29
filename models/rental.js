const mongoose = require('mongoose') ;

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    trim: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
    trim: true
  }
}) ;

module.exports.Rental = mongoose.model('Rental', rentalSchema) ;