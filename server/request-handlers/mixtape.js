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

 // TODO: Add error handlers
exports.addToPlaylist = function(req, res, next) {
  var song = req.body;
  var userEmail = req.session.username;

  db.addSong(song, userEmail)
    .then(function(song) {
      res.status(200).send(song);
    }).catch(function(error) {
      console.error('error: ', error);
    });
};

exports.deleteSong = function(req, res, next) {
  var song = req.body;
  var userEmail = req.session.username;

  db.deleteSong(song)
    .then(function(song) {
      db.getPlaylist(userEmail)
        .then(function(playlist) {
          if (!Array.isArray(playlist)) {
            playlist = [];
          }
          res.status(200).send(playlist);
        })
        .catch(function(error) {
          res.send('[]');
        });
    }).catch(function(error) {
      console.error('error: ', error);
    });
};

exports.getPlaylist = function(req, res, next) {
  var userEmail = req.session.username;

  db.getPlaylist(userEmail)
    .then(function(playlist) {
      if (!Array.isArray(playlist)) {
        playlist = [];
      }
      res.status(200).send(playlist);
    }).catch(function(error) {
      console.error('error: ', error);
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
