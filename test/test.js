var should = require('should')
  , DB = require('../db')
var app = require('../app')
var request = require('supertest')(app);


describe("API is living", function (){
    before(function(done) {
      DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    })

  it('should get a response from the server', function(done){
    request
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
})

describe("Create Read Update Delete Marques via API", function (){
    before(function(done) {
      DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    })

  it('should create new marque Peugeot', function(done){
    var marque = {name: 'Peugeot'}
    request
      .post('/api/marques')
      .send(marque)
      .expect("Peugeot is stored", done);
  });

  it('should read Peugeot object', function(done){
    request
      .get('/api/marques/55d614ce9233f1fd74a1c9d0')
      .expect(200, done);
  });

  it('should list all marques', function(done){
    request
      .get('/api/marques')
      .expect(200, done);
  });

  it('should update Peugeot to Citroen', function(done){
    var marque = {name: 'Citroen'}
    request
      .put('/api/marques/55d614ce9233f1fd74a1c9d0')
      .send(marque)
      .expect("Citroen has updated Peugeot", done);
  });

  it('should delete Citroen', function(done){
    var marque = {name: 'Citroen'}
    request
      .del('/api/marques/55d614ce9233f1fd74a1c9d0 ')
      .send(marque)
      .expect("Citroen has been deleted", done);
  });

})