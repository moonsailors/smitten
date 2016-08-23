var db = require('./controllers.js');
var Promise = require('bluebird');

var extractDate = function(memo, post){
  var date = JSON.stringify(post.time).substring(1, 10);
  for(var user in memo){
    if(memo[user].id === post.creatorId){
      if(memo[user].posts[date] === undefined){
        memo[user].posts[date] = "";
      }
      memo[user].posts[date] += post.description + " ";
    }
    return memo;
  }
}

var chunkedUserPosts = function(email, callback){
  var relationshipPosts = [];
  db.getRelationshipByEmail(email)
    .then(function(relationship){
      var postObject = {};
      relationship.users.forEach(function(user){
        postObject[user.email] = { id: user.id, posts: {} };
      });
      console.log(relationship.posts.reduce(callback, postObject));
    })
};
var relationshipId;
db.createRelationship('this is a tes')
  .then(function(relationship){
    // console.log(relationship.id);
    relationshipId = relationship.id;
    return db.createUser('amy', 'moody');
  })
  .then(function(user){
    return db.User.get(user.id).update({relationshipId: relationshipId}).run();
  })
  .then(function(user){
    return db.createUser('doug', 'stupid');
  })
  .then(function(user){
    return db.User.get(user.id).update({relationshipId: relationshipId}).run();
  })
  .then(function(user){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(post){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(post){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(post){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(post){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(post){
    return db.createPost('amy', {description: "this is a big test"});
  })
  .then(function(user){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    return db.createPost('doug', {description: "doug is dumb"});
  })
  .then(function(post){
    chunkedUserPosts('amy', extractDate);
  });



