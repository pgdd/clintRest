// BoilerPlate to handle DB connection. It will always be the same db object because require caches the result the first time it is called.
var mongoose = require('mongoose');

var state = {
  db: null,
}

var PRODUCTION_URI = 'mongodb://127.0.0.1:27017/production'
  // , TEST_URI = 'mongodb://pierre:password@galaga.0.mongolayer.com:10243,galaga.1.mongolayer.com:10240/test_db?replicaSet=set-54d0747144af4cc54800053b'
  , TEST_URI = 'mongodb://127.0.0.1:27017/test'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

exports.connect = function(mode, done) {
  if (state.db) return done()

  if (arguments.length === 1) {
    done = mode
    mode = exports.MODE_TEST
  }

  if (mode === exports.MODE_TEST) {
    var uri = TEST_URI
    mongoose.createConnection(uri, function(err) {
      if (err) return done(err)
      db = mongoose.connection;
      state.db = db._readyState
      state.mode = mode
      console.log('switch to testing database')
      done()
    })
  } else {
    var uri = PRODUCTION_URI
    mongoose.connect(uri, function(err) {
      if (err) return done(err)
      db = mongoose.connection
      state.db = db._readyState
      state.mode = mode
      console.log('mode production started')
      done()
    })
  }


}

exports.getDB = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    console.log('closing?')
    mongoose.disconnect()
    state.db = null
    state.mode = null
    done()
  }
}

exports.drop = function(done) {
  if (!state.db) return done()
  // This is faster then dropping the database
  state.db.collections(function(err, collections) {
    async.each(collections, function(collection, cb) {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb()
      }
      collection.remove(cb)
    }, done)
  })
}

exports.fixtures = function(data, done) {
  var db = state.db
  if (!db) {
    return done(new Error('Missing database connection.'))
  }

  var names = Object.keys(data.collections)
  async.each(name, function(name, cb) {
    db.createCollection(name, function(err, collection) {
      if (err) return cb(err)
      collection.insert(data.collections[name], cb)
    })
  }, done)
}