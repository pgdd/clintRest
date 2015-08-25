var express = require('express')
  , router = express.Router()
  , app = express()

var marques = require('../controllers/marques')
  , vehicules = require('../controllers/vehicules')
  , queries = require('../controllers/queries')


router.get('/', function(req, res) { res.json({ message: 'API is talking' });});

// CRUD marques routes

router.get('/marques', marques.index);
router.get('/marques/:id', marques.show);
router.post('/marques', marques.create);
router.put('/marques/:id', marques.update);
router.delete('/marques/:id', marques.delete);

// CRUD vehicules routes

router.get('/vehicules', vehicules.index);
router.get('/vehicules/:id', vehicules.show);
router.post('/vehicules', vehicules.create);
router.put('/vehicules/:id', vehicules.update);
router.delete('/vehicules/:id', vehicules.delete);


// Queries routes

router.get('/vehicules/marque/:marque', queries.indexVehiculesByMarque)


router.use('/api', router);
module.exports = router
