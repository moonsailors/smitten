var request = require('supertest');
var expect = require('chai').expect;
var server = require('../server/server');

describe('Server tests', function(){

  it('does a GET', function(done){
    request(server)
    .get('/')
    .expect(200, done);
  });

});