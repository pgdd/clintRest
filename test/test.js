var should = require('should')
  , DB = require('../db')
var app = require('../app')
var request = require('supertest')(app);


describe("API is living", function (){
    before(function(done) {
      DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    })

  it('responds to GET /', function(done){
    request
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds to GET /api', function(done){
    request
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds to GET /api/marques', function(done){
    request
      .get('/api/marques')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds to POST /api/marques', function(done){
    request
      .post('/api/marques')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
})