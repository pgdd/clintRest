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
  Marque.find({}, function(err, marque){
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: marque});
  })
});

router.get('/marques/:id', function(req, res) {
  var id = req.params.id;
  Marque.findOne({_id: id}, function (err, marque) {
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: marque});
  });
});

router.post('/marques', function (req, res) {
  var JSON = req.body;
  var name = JSON.name;
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


// VEHICULES


router.get('/vehicules', function(req, res) {
  Vehicule.find({}, function(err, vehicule){
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: vehicule});
  })
});

router.get('/vehicules/:id', function(req, res) {
  var id = req.params.id;
  Vehicule.findOne({_id: id}, function (err, vehicule) {
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: vehicule});
  });
});

router.post('/vehicules', function (req, res) {
  var JSON = req.body;
  var name = JSON.name;
  var marqueName = JSON.marque;
  console.log('this is post vehicules' + marqueName)

  if (marqueName) {
      Marque.findOne({name: marqueName}, function(err, marque){
        if (err) res.json({success: false, message:err});

        var vehicule = new Vehicule();
        vehicule.name = name
        vehicule._marque = marque.id;

        if (vehicule.save(function (err){

          if (err) res.json({success: false, message:err});

          marque.vehicules.push(vehicule) // update list of vehicule in marque object
          marque.save()

          res.json({success: true, message: 'Save completed', data: vehicule});

        })){}
      })

  } else {
      var vehicule = new Vehicule();
      vehicule.name = name

      vehicule.save(function(err){
        if (err) res.json({success: false, message:err});

        res.json({success: true, message: 'Save completed', data: vehicule});
    });

  }


})

router.put('/vehicules/:id', function (req, res) {
  var id = req.params.id;
  var JSON = req.body;
  var name = JSON.name;
  var marque = JSON.marque;

  if (marque) {
    Marque.findOne({name: marque}, function (err, marque) {
      console.log('this is id marque' + marque._id)
      Vehicule.findOne({_id: id}, function (err, vehicule) {
        if (err) res.json({success: false, message:err});
        vehicule._marque = marque
        marque.vehicules.push(vehicule)
        vehicule.save(function(err){
          if (err) res.json({success: false, message:err});
          marque.save(function(err){
            if (err) res.json({success: false, message:err});
            res.json({success: true, data: vehicule});
          });
        });
      });
      // vehicule = Vehicule.findOne({_id: id})
      // marque.name = name
      // vehicule._marque = marque.id;
      // if (err) res.json({success: false, message:err});

    });
  } else {
      Vehicule.findOne({_id: id}, function (err, vehicule) {
        if (err) res.json({success: false, message:err});
        if (name) vehicule.name = name;

        vehicule.save(function(err){
          if (err) res.json({success: false, message:err});
          res.json({success: true, data: vehicule});
        });
      });
  }
})


router.delete('/vehicules/:id', function(req, res){
  //Delete one task
  var id = req.params.id;
  Vehicule.remove({_id:id}, function(err, task){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Citroen has been deleted"});
  });
});

// relational routes

router.get('/vehicules/marque/:marque', function(req, res) {
  var marque = req.params.marque;
  var query = Marque.findOne({name: marque}).populate("vehicules");
  query.lean().exec(function(err, vehicules) {
      if (err) res.json({success: false, message:err});
      res.json({success: true, data: vehicules});
      //do stuff
  });
});

router.use('/api', router);
app.use(bodyParser.json());

// router.use('/marques', require('./marques'))
// router.use('/vehicules', require('./vehicules'))

module.exports = router
