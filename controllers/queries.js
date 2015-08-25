var Vehicule = require('../models/vehicule')
var Marque = require('../models/marque')

// Index vehicules by marque with populate

exports.indexVehiculesByMarque = function (req, res){
  var marque = req.params.marque;

  var query = Marque.findOne({name: marque}).populate("vehicules");
  query.lean().exec(function(err, vehicules) {
      if (err) res.json({success: false, message:err});
      res.json({success: true, data: vehicules});
  });
}