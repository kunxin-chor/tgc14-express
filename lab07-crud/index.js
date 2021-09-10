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
app.get('/', async function (req, res) {
    let response = await axios.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
    res.render('pets', {
        'allPets': response.data
    })
})

// display the create pet form
app.get('/pet/create', function (req, res) {
    res.render('create_pet')
})

app.post('/pet/create', async function (req, res) {

    // basic validation
    // length of petName > 0
    // length of category > 0

    let errors = [];
    if (req.body.petName.length == 0) {
        errors.push("Please provide a name for the pet")
    }

    if (req.body.category.length == 0) {
        errors.push("Please provide a category");
    }

    // check if no errors
    if (errors.length == 0) {
        // if no errors, proceed to create the animal using the API endpoint
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
        await axios.post(API_BASE_URL + "pet/", data);
        res.redirect('/');
    } else {
        // if have errors, then we render the hbs file with the form again
        // but this time we pass the errors to the hbs
        res.render('create_pet', {
            'errors': errors
        })
    }

})

app.listen(3000, function () {
    console.log("Server started")
})