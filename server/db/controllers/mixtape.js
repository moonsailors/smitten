var db = require('../database.js');
var PlaylistSong = db.PlaylistSong;

function addSong(song, userEmail) {
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
}

function deleteSong(song, userEmail) {
  return PlaylistSong.get(song.id)
    .then(function(song) {
      song.delete();
    });
};

function getPlaylist(userEmail) {
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
}

module.exports = {
  addSong: addSong,
  deleteSong: deleteSong,
  getPlaylist: getPlaylist
};