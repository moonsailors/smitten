var Models = require('./database.js');

var User = Models.User,
    Relationship = Models.Relationship;

var createUser = function(email, mood, callback){
  var user = new User({
    email: email,
    mood: mood
  });
  user.save()
      .then(callback)
      .error(function(err){
        console.error(err);
      });
};

var getUserByEmail = function(email){

};

var createRelationship = function(){

};
