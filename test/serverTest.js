var request = require('supertest');
var expect = require('chai').expect;
var server = require('../server/server');

describe('Server GET tests', function(){

  it('does a GET', function(done){
    request(server)
    .get('/')
    .expect(200, done);
  });

  it('googleLogin route exists', function(done){
    request(server)
    .get('/api/google/login')
    .expect(200, done);
  });

  it('googleLogout route exists', function(done){
    request(server)
    .get('/api/google/logout')
    .expect(200, done);
  });

  xit('calendar create route exists', function(done){
    request(server)
    .get('/api/calendar/create')
    .expect(200, done);
  });

  xit('posts relationship by email route exists', function(done){
    request(server)
    .get('/api/posts/relationship:jenjengoo@gmail.com')
    .expect(200, done);
  });

  xit('get playlists route exists', function(done){
    request(server)
    .get('/api/get-playlist')
    .expect(200, done);
  });

  xit('retrieve calendar ID route exists', function(done){
    request(server)
    .get('/api/calendar/calId')
    .expect(200, done);
  });

});

xdescribe('Server POST tests', function(){

  it('Google Join route exists', function(done){
    request(server)
    .post('/api/google/join')
    .send({email: 'hrr17moonsailors@gmail.com'})
    .expect(201, done);
  });


});