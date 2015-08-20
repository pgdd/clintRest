var express = require('express');
var app = express()
var router = express.Router();
var bodyParser = require('body-parser');
// var Marque = require('../models/marques')


app.use(bodyParser.json())

//Routings
// app.use('/api', router);
router.post('/marques', function (req, res) {
  console.log(name = req.body.name);

  // call to method Create
  Marque.create(name, function (err, marque) {
    res.send(200, name + " is stored");
  })
})
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });


router.get('/marques', function(req, res) {
    res.json({ message: 'you got a response for marques' });
});

router.use('/api', router);

// ROUTES
// ==============================================

// app.route('/')

//     // show the form (GET http://localhost:8080/login)
//     .get(function(req, res) {
//         res.send('this is the login form');
//     })

//     // process the form (POST http://localhost:8080/login)
//     .post(function(req, res) {
//         console.log('processing');
//         res.send('processing the login form!');
//     });

// ...




module.exports = router