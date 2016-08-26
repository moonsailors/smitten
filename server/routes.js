var requestHandler = require('./requestHandler.js');
var postRequestHandler = require('./postsRequestHandler.js');
var mixtapeRequestHandler = require('./request-handlers/mixtape.js');
var sentimentRequestHandler = require('./sentimentRequestHandler.js');

module.exports = function (app, express){

  /** google routes **/
  app.get('/api/google/login', requestHandler.googleLogin);
  app.get('/googleOAuth/', requestHandler.googleRedirect);
  app.post('/api/google/join', requestHandler.googleJoin);
  app.get('/api/google/logout', requestHandler.googleLogout);

  /** calendar routes **/
  app.get('/api/calendar/create', requestHandler.calendarCreate);
  app.post('/api/calendar/eventAdd', requestHandler.calendarEventAdd);
  app.get('/api/calendar/calId', requestHandler.calendarId);
  app.post('/api/calendar/text', requestHandler.calendarText);

  /** post-it routes **/
  app.post('/api/posts/:email', postRequestHandler.createPost);
  app.get('/api/posts/relationship/:email', postRequestHandler.getRelationshipPosts);
  app.delete('/api/posts/:id', postRequestHandler.deletePost);
  app.put('/api/posts/:id', postRequestHandler.updatePost);

  /** mixtape **/
  app.post('/api/add-song', mixtapeRequestHandler.addToPlaylist);
  app.post('/api/get-playlist', mixtapeRequestHandler.getPlaylist);
  app.post('/api/soundcloud-search', mixtapeRequestHandler.searchSoundCloud);
  app.post('/api/delete-song', mixtapeRequestHandler.deleteSong);

  /** sentiment **/
  app.get('/api/sentiment', sentimentRequestHandler.sendBackData);


};