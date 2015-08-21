var express = require('express')
  , router = express.Router()
  , Marque = require('../models/marque')
  , Vehicule = require('../models/vehicule')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


router.use(bodyParser.json());

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

router.get('/marques', function(req, res) {
  console.log('here we are')
  Marque.find({}, function(err, marque){
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: marque});
  })
});

router.get('/marques/:id', function(req, res) {
  var id = req.params.id;
  console.log('here we are params')
  console.log(id)
  Marque.findOne({_id: id}, function (err, marque) {
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: marque});
  });
});

router.post('/marques', function (req, res) {
  var JSON = req.body;
  var name = JSON.name;
  console.log(name)
  // res.json({ message: 'you got a response to the post' });
  // call to method Create
  var marque = new Marque();
  marque.name = name

  marque.save(function (err){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: 'Save completed', data: marque});
  });
})

router.put('/marques/:id', function (req, res) {
  var id = req.params.id;
  var JSON = req.body;
  var name = JSON.name;
  console.log(name)
  Marque.findOne({_id: id}, function (err, marque) {
    if (err) res.json({success: false, message:err});
    if (name) marque.name = name;

    marque.save(function(err){
      if (err) res.json({success: false, message:err});
      res.json({success: true, data: marque});
    });
  });
});


router.delete('/marques/:id', function(req, res){
  //Delete one task
  var id = req.params.id;
  Marque.remove({_id:id}, function(err, task){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Citroen has been deleted"});
  });
});




router.use('/api', router);
app.use(bodyParser.json());

// router.use('/marques', require('./marques'))
// router.use('/vehicules', require('./vehicules'))

module.exports = router
