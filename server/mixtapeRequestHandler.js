// TODO: CONVERT ALL CODE TO ES6 AND INCORPORATE BABEL INTO GULP
/** the only simple node package that i could find for soundcloud requires the use of es6.
i will try to incorporate an es5 package later **/
const client = require('./client_secret.json');
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
