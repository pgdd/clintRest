// BoilerPlate to handle DB connection. It will always be the same db object because require caches the result the first time it is called.
var mongoose = require('mongoose');

var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  mongoose.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}