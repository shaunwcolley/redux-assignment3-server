const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
models = require('./models')

app.get('/api',(req,res) => {
  res.json({message: "hiking location api"})
})

app.get('/', (req,res) => {
  res.redirect('/api')
})

app.post('/register', (req,res) => {
  let userName = req.body.userName
  models.User.findAll({
    where: {
      userName: userName
    }
  }).then(userOld => {
    if(userOld.length == 0) {
      let firstName = req.body.firstName
      let lastName = req.body.lastName
      let pass = bcrypt.hashSync(req.body.pass, saltRounds)
      let user = models.User.build({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        pass: pass
      })
      user.save().then((savedId) => {
        res.json({success: true, message: 'User was registered'})
      })
    } else{
      res.json({success: false, message: 'Username already exists.'})
    }
  })
})

app.post('/login', (req,res) => {
  let userName = req.body.userName
  models.User.findAll({
    where: {
      userName: userName
    }
  }).then((user) => {
    if(user.length == 0){
      res.json({success:false, message: 'User does not exist.'})
    }
    else {
      bcrypt.compare(req.body.pass, user[0].pass, function(err, response) {
        if(response){
          res.json({success:true, message: 'User Logged In.', userId: user[0].id})
        }
        else {
          res.json({sucess:false, message: 'Invalid Password.'})
        }
      })
    }
  })
})

app.get('/view-locations/user-id/:id', (req,res) => {
  let id = req.params.id
  res.json({message: 'Howdy'})
})

app.post('/location/user-id/:id', (req,res) => {
  let id = req.params.id
  let lat = req.body.lat
  let long = req.body.long

  let location = models.Coordinate.build({
    userId: id,
    lat: lat,
    long: long
  })
  location.save().then((savedCoordId) => {
    res.json({success: true, message: 'Location was saved.'})
  }).catch(err => res.json({success: 'false'}))
})

app.listen(PORT,function(){
  console.log("Locations getting served..")
})
