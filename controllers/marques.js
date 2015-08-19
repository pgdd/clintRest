var express = require('express');
var router = express.Router();

//Routings

router.post('/api/marques', function (req, res) {
  console.log(name = req.body.name);
  // call to method Create
  Marque.create(name, function (err, marque) {
    res.redirect('/')
  })
})



module.exports = router