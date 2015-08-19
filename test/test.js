var should = require('should')
  , DB = require('../db')
var express = require('express')
  , app = express()
var request = require('supertest');
var request = require('supertest')(app);

describe('api', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done)
  })

  describe('POST /api/marques', function() {
      it('responds with succes', function() {
        request
            .post('http://localhost:3000/api/marques/')
            .type('json')
            .send({ name: 'Peugeot' })
            .end();
      });
    });
  });