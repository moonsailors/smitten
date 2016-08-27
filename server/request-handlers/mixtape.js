var SC = require('soundcloud-node-es6');
var db = require('../db/controllers/mixtape.js');
var helpers = require('./mixtape-helpers.js');
var client;

/** config **/

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

/** request handlers **/

function addToPlaylist(req, res, next) {
  var song = req.body;
  // 'userEmail' is the signed in user's email address
  var userEmail = req.session.username;

  db.addSong(song, userEmail)
    .then(function(song) {
      res.status(200).send(song);
    })
    .catch(function(error) {
      console.error('error: ', error);
    });
}

function deleteSong(req, res, next) {
  var song = req.body;
  var userEmail = req.session.username;

  // once song is deleted from database,
  // updated playlist will be sent back as response
  db.deleteSong(song)
    .then(function(song) {
      console.log('song deleted');
      module.exports.getPlaylist(req, res, next);
    })
    .catch(function(error) {
      console.error('error: ', error);
    });
}

function getPlaylist(req, res, next) {
  var userEmail = req.session.username;

  db.getPlaylist(userEmail)
    .then(function(playlist) {
      // if playlist is empty, send back empty array
      if (!Array.isArray(playlist)) {
        playlist = [];
      }
      res.status(200).send(playlist);
    })
    .catch(function(error) {
      console.error('error: ', error);
    });
}

function searchSoundCloud(req, res, next) {
  var query = req.body;

  SC.get('/tracks', query)
    .then(function (results) {
      results = helpers.processSearchResults(results);
      res.status(200).send(results);
    })
    .catch(function(error) {
      console.log('error: ', error);
    });
}

module.exports = {
  addToPlaylist: addToPlaylist,
  deleteSong: deleteSong,
  getPlaylist: getPlaylist,
  searchSoundCloud: searchSoundCloud
};