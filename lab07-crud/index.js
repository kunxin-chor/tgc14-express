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

// routes
app.get('/', async function(req,res){
   let response = await axios.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
   res.render('pets',{
       'allPets': response.data
   })
})

app.listen(3000, function(){
    console.log("Server started")
})