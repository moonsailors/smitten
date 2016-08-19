// TODO: CONVERT ALL CODE TO ES6 AND INCORPORATE BABEL INTO GULP
/** the only simple node package that i could find for soundcloud requires the use of es6.
i will try to incorporate an es5 package later **/
var SC = require('soundcloud-node-es6');
var db = require('../db/controllers/mixtape.js');
var client;
var ENV = {
  "soundcloud": {
    "id": process.env.SOUNDCLOUD_ID,
    "secret": process.env.SOUNDCLOUD_SECRET
  }
};

if(process.env.PORT){
  client = ENV;
} else {
  client = require('../client_secret.json');
}

SC.init({
  id: client.soundcloud.id,
  secret: client.soundcloud.secret
});

/**
 * request handlers
 */
exports.addToPlaylist = function(req, res, next) {
  var song = req.body;
  var relationshipId = req.session.username;

  db.addSong(song, email)
    .then(function(song) {
      res.status(200).send(song);
    });
};

exports.getPlaylist = function(req, res, next) {
  var relationshipId = req.session.username;
  console.log(req);

  db.getPlaylist(relationshipId)
    .then(function(playlist) {
      res.status(200).send(playlist);
    });
};

exports.searchSoundCloud = function(req, res, next) {
  var query = req.body;

  SC.get('/tracks', query)
    .then(function (results) {
      console.log('success!  search results received from soundcloud');
      results = processSearchResults(results);
      res.status(200).send(results);
    }).catch(function(error) {
      console.log('error: ', error);
    });
};


/**
 * helpers
 */
function processSearchResults(results) {
  return results.map(function(result) {
    var song = {
      title: result.title,
      artist: result.user.username,
      image: result.artwork_url,
      stream: result.stream_url,
      permalink: result.permalink_url
    };

    return song;
  });
}
