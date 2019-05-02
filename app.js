const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
// models = require('./models')

app.get('/api',(req,res) => {
  res.json({message: "hiking location api"})
})

app.get('/', (req,res) => {
  res.redirect('/api')
})

app.listen(PORT,function(){
  console.log("Locations getting served..")
})
