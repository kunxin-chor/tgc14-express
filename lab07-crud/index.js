const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'))

// enable forms processing
app.use(express.urlencoded({
    extended: false
}))

// enable wax-on (for template inheritance: extend and block)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

const API_BASE_URL = "https://petstore.swagger.io/v2/"

// routes
app.get('/', async function(req,res){
   let response = await axios.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
   res.render('pets',{
       'allPets': response.data
   })
})

// display the create pet form
app.get('/pet/create', function(req,res){
    res.render('create_pet')
})

app.post('/pet/create', async function(req,res){
 let data = {
    "id": Math.floor(Math.random() * 99999 + 10000),
    "category": {
      "id": Math.floor(Math.random() * 99999 + 10000),
      "name": req.body.category
    },
    "name": req.body.petName,
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
  await axios.post(API_BASE_URL+"pet/", data);
  res.send("Adding pet successful");
})

app.listen(3000, function(){
    console.log("Server started")
})