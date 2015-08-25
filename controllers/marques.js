var Marque = require('../models/marque')


// Create

exports.create = function(req, res) {
  var JSON = req.body;
  var name = JSON.name;

  var marque = new Marque();
  marque.name = name

  marque.save(function (err){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: 'Save completed', data: marque});
  });
}

// Read

exports.show = function(req, res) {
  var id = req.params.id;

  Marque.findOne({_id: id}, function (err, marque) {
    if (err) res.json({success: false, message:err});

    res.json({success: true, data: marque});
  });
}

exports.index = function(req, res) {
  Marque.find({}, function(err, marque) {
    if (err) res.json({success: false, message:err});
    res.json({success: true, data: marque});
  })
};

// Update

exports.update = function(req, res) {
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
};

// Delete

exports.delete = function(req, res) {
  var id = req.params.id;

  Marque.remove({_id:id}, function(err, marque){
    if (err) res.json({success: false, message:err});

    res.json({success: true, message: "Marque has been deleted"});
  });
}