var requestHandler = require('./requestHandler.js');
var postRequestHandler = require('./postsRequestHandler.js');

module.exports = function (app, express){


  app.post('/api/amazonSearch', requestHandler.amazonSearchItem);

  app.get('/api/google/login', requestHandler.googleLogin);
  app.get('/googleOAuth/', requestHandler.googleRedirect);
  app.post('/api/google/join', requestHandler.googleJoin);

  app.get('/api/calendar/create', requestHandler.calendarCreate);
  app.post('/api/calendar/eventAdd', requestHandler.calendarEventAdd);


  app.get('/api/posts/:email', postRequestHandler.getRelationshipPosts);
  app.post('/api/posts/:email', postRequestHandler.createPost);
  app.delete('/api/posts/:id', postRequestHandler.deletePost);
  app.put('/api/posts/:id', postRequestHandler.updatePost);

  //tester routes
  app.post('/api/users', postRequestHandler.createUser);
  app.put('/api/users', postRequestHandler.updateUser);
  app.post('/api/relationship/:calendarId', postRequestHandler.createRelationship);
  app.get('/api/relationship/:email', postRequestHandler.getRelationship);

};