var requestHandler = require('./requestHandler.js');

module.exports = function (app, express){

  app.post('/api/amazonSearch', requestHandler.amazonSearchItem);

  app.get('/api/google/login', requestHandler.googleLogin);
  app.get('/googleOAuth/', requestHandler.googleRedirect);
  app.post('/api/google/join', requestHandler.googleJoin);

  app.get('/api/calendar/create', requestHandler.calendarCreate);
  app.post('/api/calendar/eventAdd', requestHandler.calendarEventAdd);

};