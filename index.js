const express = require('express'),
			genres  = require('./routes/genres'),
      Joi     = require('joi') ;

const app = express() ;

//------------------------------------- Middlewares ------------------------------//
app.use(express.json()) ;

//--------------------- Routes ---------------------//
app.use('/api/genres', genres) ;

// Ruuning app at 3000 port.
const PORT = 3000 ;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`) ;
}) ;