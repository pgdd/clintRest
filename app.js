// Dependencies

var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose');


app.use(bodyParser.json())
app.use(require('./controllers/routes'))

// Startup

mongoose.connect('mongodb://127.0.0.1:27017/production', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Connected to production DB')
      console.log('Listening on port 3000...')
    })
  }
})

module.exports = app