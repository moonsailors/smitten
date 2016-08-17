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
  SC.get('/tracks/245743948').then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
};
