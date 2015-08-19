var mongoose = require('mongoose')
  , Marque = mongoose.model('vehicule', require('../models/vehicule'));

var express = require('express')
var router = express.Router()


module.exports = router