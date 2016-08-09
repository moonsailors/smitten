var db = require('./database.js');

var User = db.User,
    Relationship = db.Relationship,
    Wish = db.Wish,
    thinky = db. thinky,
    r = thinky.r,
    Query = thinky.qyery;

//USER CRUD
/*************************************/
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

//Create
//callback(result, req, res);
var createUser = function(email, mood){
  return getUserByEmail(email)
    .then(function(user){
      if(user === undefined){
        var user = new User({
          email: email,
          mood: mood
        });
        return user.save();
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
var createRelationship = function(calendarId){
  var user1Id, user2Id, relationshipId;

  return new Relationship({
      calendarId: calendarId,
      wishlist: []
    }).save()
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
};

//Wishlist CRUD
/********************************************/

//create wish
var createWish = function(email, params){
  return getUserByEmail(email)
    .then(function(user){
      params.relationshipId = user.relationshipId;
      params.creatorId = user.id;
      return new Wish(params).save();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
};

var getUserWishes = function(email){
  return getUserByEmail(email)
    .then(function(user){
      return Wish.filter({creatorId: user.id}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
}

var getRelationshipWishes = function(email){
  return getRelationshipByEmail(email)
    .then(function(relationship){
      return Wish.filter({relationshipId: relationship.id}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
}

//update wish (assuming id is present)
var updateWish = function(id, params){
  return Wish.get(id).update(params)
    .run()
    .error(function(err){
      console.error(err);
      throw err;
    });
};

var deleteWish = function(id){
  return Wish.get(id).getJoin({creator: true, relationship: true}).run()
    .then(function(wish){
      return wish.delete();
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
  updateRelationship: updateRelationship
}
