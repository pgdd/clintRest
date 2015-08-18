// dépendances
var express = require('express');
var mongoose = require('mongoose');
var app = express();

// Création des Schémas
var vehiculesSchema = new mongoose.Schema({
  type: { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  marque: Object,
  image: String,
  year : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  ref: { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  description : String,
  last_modified : { type : Date, default : Date.now }

});

var marquesSchema = new mongoose.Schema({
  nom: { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  website : String,
  image: String,
  last_modified : { type : Date, default : Date.now }
});


// Création des models
var vehicule = mongoose.model('vehicules', vehiculesSchema);
var marque = mongoose.model('marques', marquesSchema);

// Insert Data

// var peugeot206 = new vehicule({ type : '4x4' });
// peugeot206.description = 'petite voiture';

// peugeot206.save(function (err) {
//   if (err) { throw err; }
//   console.log('Véhicule ajouté avec succès !');
//   mongoose.connection.close();
// });


// startup
app.get('/', function(req, res){
  res.send('hello');
});

mongoose.connect('mongodb://localhost/testclint', function(err) {
  if (err) { throw err; }
});

console.log('startup');
app.listen(3000);




