// TODO: CONVERT ALL CODE TO ES6 AND INCORPORATE BABEL INTO GULP
/** the only simple node package that i could find for soundcloud requires the use of es6.
i will try to incorporate an es5 package later **/
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
  }
}

var client;
if(process.env.PORT){
  client = ENV;
} else {
  client = require('./client_secret.json');
}

const SC = require('soundcloud-node-es6');

SC.init({
  id: client.soundcloud.id,
  secret: client.soundcloud.secret
});

exports.searchSoundCloud = function(req, res, next) {
  const query = req.body;

  SC.get('/tracks', query)
    .then((results) => {
      console.log('success!  search results received from soundcloud');
      results = processSearchResults(results);
      res.send(results);
    }).catch((error) => {
      console.log('error: ', error);
    });
};

function processSearchResults(results) {
  return results.map(function(result) {
    var song = {
      title: result.title,
      artist: result.user.username,
      image: result.artwork_url
    };

    return song;
  });
}
