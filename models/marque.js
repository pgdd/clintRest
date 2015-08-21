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

