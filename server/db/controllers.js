var db = require('./database.js');

var User = db.User,
    Relationship = db.Relationship,
    Post = db.Post,
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
        return User.get(user[0].id).getJoin({posts: true}).run();
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
  return User.filter({email: email}).run()
    .then(function(user){
      return Relationship.get(user[0].relationshipId).getJoin({users: true, posts: true}).run();
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
      if(relationship){
        return Relationship.get(relationship.id).update(params).run();
      }
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
};

var deleteRelationship = function(email){
  getRelationshipByEmail(email)
    .then(function(relationship){
      if(relationship){
        return realtionship.delete();
      }
    });
}

//Post CRUD
/********************************************/

//create post
var createPost = function(email, params){
  return getUserByEmail(email)
    .then(function(user){
      params.relationshipId = user.relationshipId;
      params.creatorId = user.id;
      return new Post(params).save();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
};

var getUserPosts = function(email){
  return getUserByEmail(email)
    .then(function(user){
      return Post.filter({creatorId: user.id}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
}

var getRelationshipPosts = function(email){
  return getRelationshipByEmail(email)
    .then(function(relationship){
      return Post.filter({relationshipId: relationship.id}).run();
    })
    .error(function(err){
      console.error(err);
      throw err;
    })
}

//update Post (assuming id is present)
var updatePost = function(id, params){
  return Post.get(id).update(params)
    .run()
    .error(function(err){
      console.error(err);
      throw err;
    });
};

var deletePost = function(id){
  return Post.get(id).getJoin({creator: true, relationship: true}).run()
    .then(function(post){
      return post.delete();
    })
    .error(function(err){
      console.error(err);
      throw err;
    });
}

//sentiment parsing helper functions
/********************************************/


module.exports = {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  updateUser: updateUser,
  deleteUser: deleteUser,
  createRelationship: createRelationship,
  getRelationshipByEmail: getRelationshipByEmail,
  updateRelationship: updateRelationship,
  deleteRelationship : deleteRelationship,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  getRelationshipPosts: getRelationshipPosts,
  getUserPosts: getUserPosts,
  User: User,
  Post: Post,
  Relationship: Relationship
}
