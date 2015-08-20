var should = require('should')
  , DB = require('../db')
var app = require('../app')
var request = require('supertest')(app);


describe("api is responding", function (){
    before(function(done) {
      DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    })

  it('respond with json', function(done){
    request
      .get('/api/marques')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
})