var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var client = require('./client_secret.json');
var request = require('request');

var oauth2Client = new OAuth2(client.web.client_id, client.web.client_secret, client.web.redirect_uris[1]);
var calendar = google.calendar('v3');

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/calendar'
];

var calendarUrl = "https://www.googleapis.com/calendar/v3/calendars";

// Amazon API authorization
var amazon = require('amazon-product-api');
var amazonClient = amazon.createClient({
  awsId: client.amazon.access_key_id,
  awsSecret: client.amazon.secret_access_key,
  awsTag: client.amazon.associate_tag
});

module.exports = {

  googleLogin: function(req, res, next){
    console.log('in googleLogin');

    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes // If you only need one scope you can pass it as string
    });
    console.log("url is ", url);
    res.redirect(url);

  },

  googleRedirect: function(req, res, next){
    //use req.params.code
    console.log('code ', req.query.code);

    oauth2Client.getToken(req.query.code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
        console.log("tokens are ", tokens);
      }

    });
    res.redirect('/');
  },

  calendarCreate: function(req, res, next){

    calendar.calendars.insert({
      auth: oauth2Client,
      resource: {
      summary: 'Smitten'
      }
    }, function(err, event){
      if(err){
        console.log("calendar error: ", err);
      }
      console.log("Smitten calendar created ", event);
    });

  },

  // currently hardcoded to search only by keyword
  amazonSearchItem: function(req, res, next) {

    amazonClient.itemSearch({
      keywords: req.body.keywords,
    }).then(function(results) {
      console.log(results);
    }).catch(function(err) {
      errString = JSON.stringify(err);
      console.log(errString);
    });

  }
};