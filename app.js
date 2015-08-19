var express = require('express')
  , app = express()

var db = require('./db')

app.use(require('./controllers'))

db.connect('mongodb://localhost:27017/clint_dev', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})

