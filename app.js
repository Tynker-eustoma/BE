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
   let messege = {messege: 'Internal server error'}

   if(err.messege === 'Invalid token' || err.name === 'JsonWebTokenError'){
      messege.messege = 'Invalid token'
   } else if(err.name === 'SequelizeValidationError'){
      messege.messege = err.errors[0].message
   }

   console.log(err);

   res.status(code).json(messege)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})