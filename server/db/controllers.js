var db = require('./database.js');

var User = db.User,
    Relationship = db.Relationship,
    thinky = db. thinky,
    r = thinky.r,
    Query = thinky.qyery;

//USER CRUD
/*************************************/
//Create
//callback(result, req, res);
var createUser = function(email, mood){
  var user = new User({
    email: email,
    mood: mood
  });
  return user.save();
};

//Retrieve
var getUserByEmail = function(email){
  return User.filter({email: email}).run();
};

//Update
var updateUser = function(email, params){
  return getUserByEmail(email)
    .then(function(user){
      return User.get(user[0].id).update(params).run();
    });
};

//Delete
var deleteUser = function(email){

  return getUserByEmail(email)
    .then(function(user){
      var id = user[0].id;
      return User.get(id).getJoin({relationship: true}).run();
    })
    .then(function(user){
      return user.delete();
    });
};

/********************************************/

var createRelationship = function(email1, email2, callback ){

};
/********************************************/
createUser('email', 'sad')
  .then(function(user){
    console.log(user)
    return updateUser(user.email, {mood: 'slap happy'});
  })
  .then(function(result){
    console.log(result);
  });




module.exports = {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  createRelationship: createRelationship,
}
