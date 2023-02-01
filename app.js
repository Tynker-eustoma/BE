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

   console.log(err);

   res.status(code).json(messege)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})