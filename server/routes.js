var requestHandler = require('./requestHandler.js');

module.exports = function (app, express){

  app.get('/api/googleLogin', requestHandler.googleLogin);
  app.get('/googleOAuth/', requestHandler.googleRedirect);
  app.post('/api/amazonSearch', requestHandler.amazonSearchItem);



  app.get('/api/calendar/create', requestHandler.calendarCreate);

  app.post('/api/calendar/join', requestHandler.calendarJoin);

  app.post('/api/calendar/eventAdd', requestHandler.calendarEventAdd);

};