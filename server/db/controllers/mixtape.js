var db = require('../database.js');
var PlaylistSong = db.PlaylistSong;

exports.addSong = function(song) {
  return new PlaylistSong({
    relationshipId: localStorage.user,
    title: song.title,
    artist: song.artist,
    image: song.image,
    stream: song.stream,
    permalink: song.permalink
  })
  .save(function(song) {
    console.log('song saved to DB');
  })
  .error(function(err) {
    console.log('Cannot add song to DB');
    console.error(err);
  });
};

exports.deleteSong = function(id) {
  return PlaylistSong.get(id)
    .then(function(song) {
      return song.delete();
    })
    .error(function(err) {
      console.log('Unable to delete song in DB');
      console.error(err);
    });
};

exports.getPlaylist = function() {
  return PlaylistSong.filter({
    // TODO: remove hard coding
    relationshipId: 'hthr.prk@gmail.com'
  }).run()
    .then(function(playlist) {
      console.log('playlist retrieved');
      console.log(playlist);
    })
    .error(function(err) {
      console.log('Playlist not found in DB');
      console.error(err);
    });
};