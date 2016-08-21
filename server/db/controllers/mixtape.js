var db = require('../database.js');
var PlaylistSong = db.PlaylistSong;

exports.addSong = function(song, userEmail) {
  return new PlaylistSong({
    relationshipId: userEmail,
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

exports.deleteSong = function(userEmail) {
  return PlaylistSong.filter({
    relationshipId: userEmail,
    id: id
  }).run()
    .then(function(song) {
      return song.delete();
    })
    .error(function(err) {
      console.log('Unable to delete song in DB');
      console.error(err);
    });
};

exports.getPlaylist = function(userEmail) {
  console.log('user email', userEmail);
  return PlaylistSong.filter({
    relationshipId: userEmail
  }).run()
    .then(function(playlist) {
      console.log('playlist retrieved');
      return playlist;
    })
    .error(function(err) {
      console.log('Playlist not found in DB');
      console.error(err);
    });
};