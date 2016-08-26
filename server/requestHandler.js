var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');

//ENV object will be used during production.  But, for development,
//a client_secret.json file should be created with your own ID keys
//and stored in the server folder.  Follow the structure of the ENV
//variable for the client_secret.json file and export it.

var ENV = {
  "web": {
    "client_id": process.env.GOOGLE_CLIENT_ID,
    "project_id":"my-project-1470442389075",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": process.env.GOOGLE_CLIENT_SECRET,
    "redirect_uris":["http://just-smitten.herokuapp.com/googleOAuth",
    "http://localhost:3000/googleOAuth"],
    "javascript_origins":["http://just-smitten.herokuapp.com",
    "http://localhost:3000"]
  },
  "soundcloud": {
    "id": process.env.SOUNDCLOUD_ID,
    "secret": process.env.SOUNDCLOUD_SECRET
  },
  "textmagic": {
    "id": process.env.TEXTMAGIC_ID,
    "user": process.env.TEXTMAGIC_USER
  }
}
var client;
var api_host;
var redirect;
if(process.env.PORT){
  client = ENV;
  api_host = 'http://just-smitten.herokuapp.com:' + process.env.PORT;
  redirect = ENV.web.redirect_uris[0];
} else {
  client = require('./client_secret.json');
  api_host = 'http://localhost:3000';
  redirect = ENV.web.redirect_uris[1];
}

var request = require('request');
var db = require('./db/controllers');
var oauth2Client = new OAuth2(client.web.client_id, client.web.client_secret, redirect);
var calendar = google.calendar('v3');
var TMClient = require('textmagic-rest-client');

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read',
  'https://www.googleapis.com/auth/calendar'
];

var calendarUrl = "https://www.googleapis.com/calendar/v3/calendars";
var TMUrl = "https://rest.textmagic.com/api/v2/messages";

var text = new TMClient(client.textmagic.user, client.textmagic.id);

module.exports = {

  googleLogin: function(req, res, next){
    console.log('in googleLogin');

    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes // If you only need one scope you can pass it as string
    });
    res.status(200).send(url);

  },

  googleRedirect: function(req, res, next){
    //come here we get the redirect.  ask for a token to store.
    //use req.query.code

    oauth2Client.getToken(req.query.code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);

        plus.people.get({ userId: 'me', auth: oauth2Client}, function(err, response){

            req.session.username = response.emails[0].value;
            // currentEmail = response.emails[0].value;

            db.getUserByEmail(req.session.username)
              .then(function(user){
                  //if user doesn't exist, create new user
                  //and redirect to login

                if(!user){
                  db.createUser(req.session.username, 'excited')
                    .then(function(user){
                      //redirect to create calendar

                      res.redirect('/api/calendar/create')
                    })
                    .catch(function(err){
                      console.error(err);
                    });
                } else {
                  //if user does exist and has relationship
                  //redirect to '/'
                  if(user.relationshipId){
                    //save tokens

                    db.User.get(user.id)
                    .update({token: tokens})
                    .run()
                    .then(function(user){
                      res.redirect('/');
                    });
                  } else {
                  //if user does exist and doesn't have relationship
                  //redirect to login
                    res.redirect(api_host + '/#/login');
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

   //Add partner to link with
  googleJoin: function(req,res, next){

    //add partner to the user's Smitten calendar to read/write
    var calID;
    //create new user with incoming email
    //connect them to a relationship

    db.createUser(req.body.email, 'excited')
    .then(function(){
      return db.getRelationshipByEmail(req.session.username);
    })
    .then(function(relationship){
      db.updateUser(req.body.email, {relationshipId: relationship.id});
      calID = relationship.calendarId;
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
        res.status(201).send(calID);

      });

    });
  },

  googleLogout : function(req, res, next){
    req.session.destroy();
    res.status(200).send();
  },

  calendarCreate: function(req, res, next){
    //create a new Smitten calendar for the logged in google user

    calendar.calendars.insert({
      auth: oauth2Client,
      resource: {
      summary: 'Smitten'
      }
    }, function(err, event){
      if(err){
        console.log("calendar error: ", err);
      }

      //add calendarID "event.id" entry to Users table
      //add the calendar id to a relationship
      //attach that relationshipid to a user

      db.createRelationship(event.id)
      .then(function(relationship){
        db.updateUser(req.session.username, {relationshipId: relationship.id});
      });

      //redirect to login
      res.redirect(api_host + '/#/login');
    });

  },

  //redirected here when loading calendar page.
  //retrieve ID from database and send back to front end
  calendarId: function(req,res,next){
    db.getRelationshipByEmail(req.session.username)
    .then(function(relationship){
      var body = {user: req.session.username, calId: relationship.calendarId};
      bodyString =  JSON.stringify(body);
      res.status(200).send(bodyString);
    })
  },

  //redirected here to send a text message with Text Magic API
  calendarText: function(req, res, next){
    var time = req.body.time + '-07:00';
    var UTC = Date.parse(time);
    UTC = UTC/1000;

    text.Messages.send({text: req.body.text, phones: req.body.phone, sendingTime: UTC}, function(err, response){
        res.status(201).send(response);
    });

  },

  calendarEventAdd : function(req, res, next){
    //Add events to the Smitten Calendar
    var calId;

    db.getRelationshipByEmail(req.session.username)
    .then(function(relationship){
      calId = relationship.calendarId;
    })
    .then(function(){
      calendar.events.insert({
        auth: oauth2Client,
        calendarId: calId,
        resource: req.body,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        res.status(201).send(event.htmlLink);
      });
    });
  }


};
