var Vehicule = require('../models/vehicule')
  , Marque = require('../models/marque')


// Create

exports.create = function(req, res) {
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
}

// Read

exports.show = function(req, res) {
  var id = req.params.id;

  Vehicule.findOne({_id: id}, function (err, vehicule) {
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: vehicule});
  });
}

exports.index = function(req, res) {
  Vehicule.find({}, function(err, vehicule){
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: vehicule});
  })
}

// Update

exports.update = function(req, res) {
  var id = req.params.id;
  var JSON = req.body;
  var name = JSON.name;
  var marque = JSON.marque;

  if (marque) { // condition to update _marque of a vehicule, when present in JSON
    Marque.findOne({name: marque}, function (err, marque) {
      Vehicule.findOne({_id: id}, function (err, vehicule) {
        if (err) res.json({success: false, message:err});
        vehicule._marque = marque._id
        // if (name) vehicule.name = name;
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
};

// Delete

exports.delete = function(req, res) {
  var id = req.params.id;

  Vehicule.remove({_id:id}, function(err, vehicule){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Vehicule has been deleted"});
  });
}