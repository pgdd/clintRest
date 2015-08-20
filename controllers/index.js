var express = require('express')
  , router = express.Router()
  , Marque = require('../models/marque')
  , Vehicule = require('../models/vehicule')
var app = express()


//routing

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// API

router.get('/', function(req, res) {
    res.json({ message: 'you got a response' });
});


router.post('/marques', function (req, res) {
  // console.log(name = req.body.name);
  res.json({ message: 'you got a response to the post' });

  // call to method Create
  // Marque.create(name, function (err, marque) {
  //   res.send(200, name + " is stored");
  // })
})


router.get('/marques', function(req, res) {
    res.json({ message: 'you got a response for marques' });
});



router.use('/api', router);

// router.use('/marques', require('./marques'))
// router.use('/vehicules', require('./vehicules'))



module.exports = router
