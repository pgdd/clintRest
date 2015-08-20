var db = require('../db').db;
var mongoose = require('mongoose');
Schema = mongoose.Schema


// Mongoose Schema

var marqueSchema = new mongoose.Schema({
  name: String,
  website: String,
  image: String,
  vehicules : [{ type: Schema.Types.ObjectId, ref: 'vehicule' }], // each marque has-many véhicules
});

module.exports = mongoose.model('Marque', marqueSchema);

//Methods

// Create new marque in database
exports.create = function(name, cb) {
  var marque = new Marque({name: name});
  Marque.save()
}


exports.update = function(cb) {
    marques = Marque.find({})
}
