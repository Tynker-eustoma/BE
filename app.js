require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/router')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)

app.use((err, req, res, next) => {
   
   let code = 500
   let message = {message: 'Internal server error'}

   if(err.name === 'Invalid token' || err.name === 'JsonWebTokenError'){
      code=401
      message.message = 'Invalid token'
   } else if(err.name === 'SequelizeValidationError'){
      code=400
      message.message = err.errors[0].message
   } else if (err.name === 'Invalid Email/Password') {
      code=401
      message.message = err.name
   } else if (err.name === 'Category id not found') {
      code = 404
      message.message = err.name
   } else if (err.name === "Choice required for Counting & Guess games"){
      code = 400
      message.message = err.name
   } else if (err.name === "Image Url required for Counting & Guess games"){
      code = 400
      message.message = err.name
   } else if (err.name === 'Game id not found'){
      code = 404
      message.message = err.name
   } else if (err.name === 'Your level is low to access this page'){
      code = 401
      message.message = err.name
   }

   console.log(err);

   res.status(code).json(message)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})