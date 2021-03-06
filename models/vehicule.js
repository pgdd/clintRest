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
