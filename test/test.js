// var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var myApp = require('../server.js');
var request = require('supertest')(myApp);

describe('api', function() {
  before(function() {

  });
  describe('POST /marques', function() {
    it('responds with succes', function() {
      request
          .post('http://localhost:3000/api/marques/')
          .type('json')
          .send({ name: 'Peugeot' })
          .end();
    });
  });
});
