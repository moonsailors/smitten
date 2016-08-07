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
  return User.filter({email: email}).run()
    .then(function(user){
      if(!(user.length < 1)){
        return User.get(user[0].id).run();
      }
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
};

//Update
var updateUser = function(email, params){
  return getUserByEmail(email)
    .then(function(user){
      return User.get(user.id).update(params).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
};

//Delete
var deleteUser = function(email){

  return getUserByEmail(email)
    .then(function(user){
      var id = user.id;
      return User.get(id).getJoin({relationship: true}).run();
    })
    .then(function(user){
      return user.delete();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
};

//Realtionship CRUD
/********************************************/
//Create
var createRelationship = function(email1, email2, calendarId){
  var user1Id, user2Id, relationshipId;

  return getUserByEmail(email1)
    .then(function(user){
      user1Id = user.id;
      return getUserByEmail(email2);
    })
    .then(function(user){
      user2Id = user.id;
      return new Relationship({
        calendarId: 'smooth operator',
        wishlist: []
      }).save()
    })
    .then(function(relationship){
      relationshipId = relationship.id;
      return User.get(user1Id).update({relationshipId: relationshipId}).run();
    })
    .then(function(){
      return User.get(user2Id).update({relationshipId: relationshipId}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
};

//retrieve
var getRelationshipByEmail = function(email){
  return getUserByEmail(email)
    .then(function(user){
      return Relationship.get(user.relationshipId).getJoin({users: true}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
}

//update
var updateRelationship = function(email, params){
  getRelationshipByEmail(email)
    .then(function(relationship){
      return Relationship.get(relationship.id).update(params).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
}

var addWishToRelationship = function(email, wish){
  getRelationshipByEmail(email)
    .then(function(relationship){
      relationship.wishlist.push(wish);
      return Relationship.get(relationship.id).update({whislist: relationship.wishlist}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
}

//this is dubius because of objects !equaling objects
var removeWishFromRelationship = function(email, wishToRemove){
  getRelationshipByEmail(email)
    .then(function(relationship){
      relationship.wishlist.splice(relationship.wishlist.indexOf(wishToRemove),1);
      return Relationship.get(relationship.id).update({wishlist: relationship.wishlist}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
}
/********************************************/
module.exports = {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  updateUser: updateUser,
  deleteUser: deleteUser,
  createRelationship: createRelationship,
  getRelationshipByEmail: getRelationshipByEmail,
  updateRelationship: updateRelationship,
  addWishToRelationship: addWishToRelationship,
  removeWishFromRelationship: removeWishFromRelationship
}
