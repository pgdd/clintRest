var express = require('express')
  , app = express()

var DB = require('./db')

app.use(require('./controllers'))

DB.connect(DB.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})