var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var client = require('./client_secret.json');
var request = require('request');
var db = require('./db/controllers');
var oauth2Client = new OAuth2(client.web.client_id, client.web.client_secret, client.web.redirect_uris[1]);
var calendar = google.calendar('v3');

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read',
  'https://www.googleapis.com/auth/calendar'
];

var calendarUrl = "https://www.googleapis.com/calendar/v3/calendars";
var calenderId;
var currentEmail;

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
    res.status(200).send(url);

  },

  googleRedirect: function(req, res, next){
    //come here we get the redirect.  ask for a token to store.
    //use req.params.code
    console.log('code ', req.query.code);

    oauth2Client.getToken(req.query.code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
        console.log("tokens are ", tokens);

        plus.people.get({ userId: 'me', auth: oauth2Client}, function(err, response){
            console.log("plus res ", response);
            currentEmail = response.emails[0].value;

            db.getUserByEmail(currentEmail)
              .then(function(user){
                  //if user doesn't exist, create new user
                  //and redirect to login
                  console.log('returned user, ', user);
                if(!user){
                  db.createUser(currentEmail, 'excited')
                    .then(function(user){
                      //redirect to create calendar
                      console.log('created new user, ', user);
                      res.redirect('/api/calendar/create')
                    })
                    .catch(function(err){
                      console.error(err);
                    });
                } else {
                  //if user does exist and has relationship
                  //redirect to '/'
                  if(user.relationshipId){
                    res.redirect('/');
                  } else {
                  //if user does exist and doesn't have relationship
                  //redirect to login
                    res.redirect('http://localhost:3000/#/login');
                  }
                }
              })
              .catch(function(err){
                console.error(err);
              });
        }); //plus.people.get
      } //end of if !err
    }); //getToken
  },

  calendarCreate: function(req, res, next){
    //create a new Smitten calendar for the logged in google user
    console.log("in calendarCreate");
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
      //add calendarID "event.id" entry to Users table
      calendarId = event.id;

      //add the calendar id to a relationship
      //attach that relationshipid to a user

      db.createRelationship(event.id)
      .then(function(relationship){
        db.updateUser(currentEmail, {relationshipId: relationship.id});
      });

      //redirect to login
      res.redirect('http://localhost:3000/#/login');
    });

  },

  googleJoin: function(req,res, next){

    //add partner to the user's Smitten calendar to read/write
    var calID;
    console.log("req.body.email is ", req.body.email);
    //create new user with incoming email
    //connect them to a relationship

    db.createUser(req.body.email, 'excited')
    .then(function(){
      return db.getRelationshipByEmail(currentEmail);
    })
    .then(function(relationship){
      db.updateUser(req.body.email, {relationshipId: relationship.id});
      calID = relationship.calendarId;
      console.log("calID ", calID);
    })
    .then(function(){

      calendar.acl.insert({
        auth: oauth2Client,
        calendarId: calID,
        resource: {
          id: 'user:' + req.body.email,
          role: 'writer',
          scope: {
            type: 'user',
            value: req.body.email
          }
        }

      }, function(err, event){
        if(err){
          console.log("calendar Join error: ", err);
        }
        console.log("insert user");
        console.log("calID after user permissions ", calID);
        res.status(201).send(calID);

      });

    });
  },

  calendarEventAdd : function(req, res, next){
    //Add events to the Smitten Calendar
    var calId;
    console.log("event ", req.body);


    var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2016-08-20T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2016-08-20T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    }};

    db.getRelationshipByEmail(currentEmail)
    .then(function(relationship){
      calId = relationship.calendarId;
      console.log("calId ", calId);
    })
    .then(function(){
      calendar.events.insert({
        auth: oauth2Client,
        calendarId: calId,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created: %s', event.htmlLink);
        res.status(201).send(event.htmlLink);
      });
    });

  },

  amazonSearchItem: function(req, res, next) {

    amazonClient.itemSearch(req.body)
    .then(function(results) {
      console.log(results);
    })
    .catch(function(err) {
      var errString = JSON.stringify(err);
      console.log(errString);
    });

  }
};