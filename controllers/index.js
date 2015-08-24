var express = require('express')
  , router = express.Router()
  , Marque = require('../models/marque')
  , Vehicule = require('../models/vehicule')
var app = express()
var bodyParser = require('body-parser');



router.get('/', function(req, res) {
    res.json({ message: 'you got a response' });
});



                      // Marques router

// Create

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

// Read

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


// Update

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

// Delete

router.delete('/marques/:id', function(req, res){
  var id = req.params.id;

  Marque.remove({_id:id}, function(err, task){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Citroen has been deleted"});
  });
});


                      // Vehicules router


// Create

router.post('/vehicules', function (req, res) {
  var JSON = req.body;
  var name = JSON.name;
  var marqueName = JSON.marque;

  if (marqueName) { // condition to post _marque of a vehicule, and make the relation
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

// Read

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

// Update

router.put('/vehicules/:id', function (req, res) {
  var id = req.params.id;
  var JSON = req.body;
  var name = JSON.name;
  var marque = JSON.marque;

  if (marque) { // condition to update _marque of a vehicule, when present in JSON
    Marque.findOne({name: marque}, function (err, marque) {
      Vehicule.findOne({_id: id}, function (err, vehicule) {
        if (err) res.json({success: false, message:err});
        vehicule._marque = marque._id
        marque.vehicules.push(vehicule)
        vehicule.save(function(err){
          if (err) res.json({success: false, message:err});
          marque.save(function(err){
            if (err) res.json({success: false, message:err});
            res.json({success: true, data: vehicule});
          });
        });
      });
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

// Delete

router.delete('/vehicules/:id', function(req, res){
  var id = req.params.id;

  Vehicule.remove({_id:id}, function(err, task){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Citroen has been deleted"});
  });
});


                      /// Custom routes

//Get all vehicules of a marque

router.get('/vehicules/marque/:marque', function(req, res) {
  var marque = req.params.marque;

  var query = Marque.findOne({name: marque}).populate("vehicules");
  query.lean().exec(function(err, vehicules) {
      if (err) res.json({success: false, message:err});
      res.json({success: true, data: vehicules});
  });
});

/////////////////

router.use('/api', router);
router.use(bodyParser.json());

module.exports = router
