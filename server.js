// dépendances
var express = require('express');
var mongoose = require('mongoose');
var app = express();
Schema = mongoose.Schema


// Schémas with one-to-many relation

var vehiculeSchema = new mongoose.Schema({
  name : String,
  _marque: { type: Schema.Types.ObjectId, ref: 'marque' }, // a vehicule belong to a marque
  description : String,
  image: String,
});

var marqueSchema = new mongoose.Schema({
  name: String,
  website: String,
  image: String,
  vehicules : [{ type: Schema.Types.ObjectId, ref: 'vehicule' }], // each marque has-many vehicules
});


// Models creation

var Vehicule = mongoose.model('vehicule', vehiculeSchema);
var Marque = mongoose.model('marque', marqueSchema);

// Insert Marques

var peugeot = new Marque({name: 'Peugeot'});
var mercedes = new Marque({name: 'Mercedes'});

peugeot.save();
mercedes.save();

// Test to Insert Vehicules


insertVehicule(peugeot, '206cc', 'voiture française');
insertVehicule(peugeot, '207', 'voiture française');
insertVehicule(mercedes, 'benz', 'voiture allemande');
insertVehicule(mercedes, 'class A', 'voiture allemande');


function insertVehicule (marque, name, description) {
  var model = new Vehicule();
  model._marque = marque.id; // establish relationship with the marque
  model.name = name;
  model.description = description;
  if (model.save()) {marque.vehicules.push(model)}; // update reference of vehicules in marque object
}



// startup
app.get('/', function(req, res){
  res.send('hello');
});

mongoose.connect('mongodb://localhost/testclint', function(err) {
  if (err) { throw err; }
});

console.log('startup');
app.listen(3000);




