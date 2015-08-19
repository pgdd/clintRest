var express = require('express')
  , router = express.Router()
  , Marque = require('../models/marque')
  , Vehicule = require('../models/vehicule')

//routing

router.use('/api/marques', require('./marques'))
router.use('/api/vehicules', require('./vehicules'))

module.exports = router