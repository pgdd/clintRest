var express = require('express');
var app = express()
var router = express.Router();
var bodyParser = require('body-parser');
// var Marque = require('../models/marques')


// router.use(bodyParser.json())

// //Routings
// // app.use('/api', router);
// router.post('/marques', function (req, res) {
//   console.log(req.body);

//   // call to method Create
//   Marque.create(name, function (err, marque) {
//     res.send(200, name + " is stored");
//   })
// })
//     .post(function(req, res) {
//         console.log('processing');
//         res.send('processing the login form!');
//     });


// router.get('/marques', function(req, res) {
//     res.json({ message: 'you got a response for marques' });
// });

// router.use('/api', router);




module.exports = router