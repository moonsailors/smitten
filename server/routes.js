var requestHandler = require('./requestHandler.js');

module.exports = function (app, express){

  app.get('/api/googleLogin', requestHandler.googleLogin);

  app.get('/googleOAuth/', requestHandler.googleRedirect);

  app.get('/api/calendarCreate', requestHandler.calendarCreate);
};