var db = require('./controllers.js');
var Promise = require('bluebird');

var extractDataByDate = function(memo, post){
  var date = JSON.stringify(post.time).substring(1, 10);
  if(memo[0].id === post.creatorId){
    if(memo[0].posts[date] === undefined){
      memo[0].posts[date] = "";
    }
    memo[0].posts[date] += post.description + " ";
  }else if(memo[1].id === post.creatorId){
    if(memo[1].posts[date] === undefined){
      memo[1].posts[date] = "";
    }
    memo[1].posts[date] += post.description + " " ;
  }
  return memo;
}

export.chunkedUserPosts = function(email, callback){
  var relationshipPosts = [];
  db.getRelationshipByEmail(email)
    .then(function(relationship){
      var postObjectArray = [];
      relationship.users.forEach(function(user){
        postObjectArray.push({ id: user.id, posts: {}, email: user.email });
      });
      console.log(relationship.posts.reduce(callback, postObjectArray));
    })
};




