var chai = require('chai')
// var should = require('chai').should
var DB = require('../db')
var app = require('../app')
var expect = require('chai').expect

var request = require('supertest')(app);

var id

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

                                      // MARQUES //


describe("Create Read Update Delete Marques via API", function (){
    // before(function(done) {
    //   DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    // })

  it('should create new Marque Peugeot', function(done){
    var marque = {name: 'Peugeot'}
    request
      .post('/api/marques')
      .send(marque)
      .end(function(err, res){
        // a = res.status
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        id = res.body.data._id;
        done()
      })
  });

  it('should list Marques collection', function(done){
    request
      .get('/api/marques')
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data).to.be.an('array');
        done();
      })
  });

  it('should retrieve Marque Peugeot', function(done){
    request
      .get('/api/marques/' + id)
      .end(function(e, res){
        expect(res)
        expect(res.body.data).to.be.an('object')
        expect(res.body.data._id).to.eql(id)
        done()
      })
  });

  it('should update Marque Peugeot to Marque Citroen', function(done){
    var marque = {name: 'Citroen'}
    request
      .put('/api/marques/' + id)
      .send(marque)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data._id).to.eql(id)
        expect(res.body.data.name).not.to.equal('Peugeot')
        id = res.body.data._id;
        done()
      })
  });

  it('should delete Marque Citroen', function(done){
    var marque = {name: 'Citroen'}
    request
      .del('/api/marques/' + id)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        done();
      });
  });

  it('should not retrieve Marque Citroen anymore', function(done){
    request
      .get('/api/marques/' + id)
      .end(function(err, res){
            expect(res.status).not.equal(404);
            expect(res.body.success).equal(true);
            expect(res.body.data).to.eql(null);
            done();
      });
  });
})

                              /// VEHICULES ///

var peugeotId
var mercedesId

describe("Create Read Update Delete Vehicules via API", function (){
    // before(function(done) {
    //   DB.connect(DB.MODE_TEST, done) //switch db for test mode, since the app has already started with the production db.
    // })
  it('should create new Marque Peugeot first', function(done){
    var marque = {name: 'Peugeot'}
    request
      .post('/api/marques')
      .send(marque)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        peugeotId = res.body.data._id;
        done()
      })
  });

  it('should create new Marque Mercedes first', function(done){
    var marque = {name: 'Mercedes'}
    request
      .post('/api/marques')
      .send(marque)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        mercedesId = res.body.data._id;
        done()
      })
  });

  it('should create new Vehicule Peugeot 206', function(done){
    var vehicule = {
      name: '206',
      marque: 'Peugeot'
    }
    request
      .post('/api/vehicules')
      .send(vehicule)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data._marque).to.eql(peugeotId)
        id = res.body.data._id;
        done()
      })
  });

  it('should create new Vehicule Mercedes Class A', function(done){
    var vehicule = {
      name: 'Class A',
      marque: 'Mercedes'
    }
    request
      .post('/api/vehicules')
      .send(vehicule)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data._marque).to.eql(mercedesId)
        id = res.body.data._id;
        done()
      })
  });


  it('should list Vehicules collection', function(done){
    request
      .get('/api/vehicules')
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data).to.be.an('array');
        done();
      })
  });

  it('should retrieve Vehicule Mercedes Class A', function(done){
    request
      .get('/api/vehicules/' + id)
      .end(function(e, res){
        expect(res)
        expect(res.body.data).to.be.an('object')
        expect(res.body.data._id).to.eql(id)
        done()
      })
  });

  it('should update Vehicule Mercedes Class A to Mercedes AMG', function(done){
    var vehicule = {name: 'AMG'}
    request
      .put('/api/vehicules/' + id)
      .send(vehicule)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        expect(res.body.data._id).to.eql(id)
        expect(res.body.data.name).not.to.equal('Class A')
        id = res.body.data._id;
        done()
      })
  });

  it('should delete Mercedes AMG', function(done){
    var vehicule = {name: 'Citroen'}
    request
      .del('/api/vehicules/' + id)
      .end(function(err, res){
        expect(res.status).not.equal(404);
        expect(res.body.success).equal(true);
        done();
      });
  });

  it('should not retrieve Vehicule Mercedes AMG anymore', function(done){
    request
      .get('/api/vehicules/' + id)
      .end(function(err, res){
            expect(res.status).not.equal(404);
            expect(res.body.success).equal(true);
            expect(res.body.data).to.eql(null);
            done();
      });
  });
})


// test relational database

  // it('should update Vehicule Peugeot 207 to Mercedes AMG', function(done){
  //   var vehicule = {name: 'Citroen'}
  //   request
  //     .put('/api/vehicules/' + id)
  //     .send(vehicule)
  //     .end(function(err, res){
  //       console.log('this is res for udpate')
  //       console.log(res.body.data)
  //       // a = res.status
  //       expect(res.status).not.equal(404);
  //       expect(res.body.success).equal(true);
  //       expect(res.body.data._id).to.eql(id)
  //       expect(res.body.data.name).not.to.equal('Peugeot')
  //       id = res.body.data._id;
  //       done()
  //     })
  // });
