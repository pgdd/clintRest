var mongoose = require('mongoose');
Schema = mongoose.Schema

// Mongoose Schema

// Schema with one-to-many relation

var vehiculeSchema = module.exports = new mongoose.Schema({
  name : String,
  _marque: { type: Schema.Types.ObjectId, ref: 'marque' }, // a vehicule belong to a marque
  description : String,
  image: String,
});

module.exports = mongoose.model('vehicule', vehiculeSchema);


// Methods

// Create new vehicule in database
exports.create = function(marque, name, description) {
  var model = new Vehicule();
  model._marque = marque.id; // establish relationship with the marque
  model.name = name;
  model.description = description;
  if (model.save()) {marque.vehicules.push(model)}; // update references of véhicules in marque object
}
