var request = require('request');
var db = require('./db/controllers');

exports.getRelationshipPosts = function(req, res, next){
  console.log(req.body);
  res.end(req.url, 200);
};

exports.createPost = function(req, res, next){
  console.log('createPost hit');
  res.end();
};

exports.deletePost = function(req, res, next){
  console.log('deletePost hit');
  res.end();
};

exports.updatePost = function(req, res, next){
  console.log('updatePost hit');
  res.end();
}

exports.createUser = function(req, res, next){
  console.log(req.body);
  db.createUser(req.body.email, req.body.mood)
    .then(function(user){
      res.send(user);
    });
}

exports.updateUser = function(req, res, next){
  
}

exports.createRelationship = function(req, res, next){
  
}

exports.getRelationship = function(req, res, next){
  
}

  // app.post('/api/users/:email', postRequestHandler.createUser);
  // app.put('/api/users/:email', postRequestHandler.updateUser);
  // app.post('/api/relationship/:calendarId', postRequestHandler.createRelationship);
  // app.get('/api/relationship/:email'), postRequestHandler.getRelationship);