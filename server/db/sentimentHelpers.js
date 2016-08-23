var db = require('./controllers.js');
var Promise = require('bluebird');

var chunkedUserPosts = function(email, callback){
  var relationshipPosts = [];
  db.getRelationshipPosts(email)
    .then(function(posts){
    });



};