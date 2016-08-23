var expect = require('chai').expect;
var _ = require('lodash');
var db = require('../server/db/database.js');
var controllers = require('../server/db/controllers.js');
var //user
    User = controllers.User,
    createUser = controllers.createUser,
    getUserByEmail = controllers.getUserByEmail,
    updateUser = controllers.updateUser,
    deleteUser = controllers.deleteUser,
    //relationship
    Relationship = controllers.Relationship
    createRelationship = controllers.createRelationship,
    getRelationshipByEmail = controllers.getRelationshipByEmail,
    updateRelationship = controllers.updateRelationship,
    deleteRelationship = controllers.deleteRelationship,
    //post
    Post = controllers.Post,
    createPost = controllers.createPost,
    getUserPosts = controllers.getUserPosts,
    getRelationshipPosts = controllers.getRelationshipPosts,
    updatePost = controllers.updatePost,
    deletePost = controllers.deletePost;

describe("User Controllers", function(){

  it('Should be able to add users', function(done){
    createUser('crupe', 'nice')
      .then(function(user){
        return getUserByEmail('crupe');
      })
      .then(function(user){
        expect(user.email).to.equal('crupe');
        done();
      })
  });

  it('Should be able to retrieve users by email', function(done){
    getUserByEmail('crupe')
      .then(function(user){
        expect(user.email).to.equal('crupe');
        done();
      });
  });

  it('Should be able to update users by email', function(done){
    updateUser('crupe', {friends: "none"})
      .then(function(user){
        expect(user.friends).to.equal("none");
        done();
      })
  });

  it('Should be able to remove users', function(done){
    deleteUser('crupe')
      .then(function(user){
        return getUserByEmail('crupe');
      })
      .then(function(user){
        expect(user).to.equal(undefined);
        done();
      })
  });

});

describe("Relationship Controllers", function(){

  it("Should be able to create a relationship", function(done){

    createRelationship("this is a calendarId")
      .then(function(relationship){
        return relationship.delete();     
      })
      .then(function(relationship){
        expect(relationship).to.exist;
        done();
      })
  });

  it("Should be able to get a relationship by email", function(done){
    createRelationship('this is an id')
      .then(function(relationship){
        relationshipId = relationship.id;
        return createUser('test user', "jerk");
      })
      .then(function(user){
        return updateUser('test user', {relationshipId: relationshipId});
      })
      .then(function(user){
        return getRelationshipByEmail('test user');
      })
      .then(function(relationship){
        expect(relationship.calendarId).to.equal('this is an id');
        done();
      })
  });

  it("Should be able to update a relationship", function(done){
    var email;
    var relationshipId;
    createRelationship('this is an id')
      .then(function(relationship){
        relationshipId = relationship.id;
        return createUser('test user', "jerk");
      })
      .then(function(user){
        return updateUser('test user', {relationshipId: relationshipId});
      })
      .then(function(user){
        return Relationship.get(relationshipId).update({update: "update"}).run();
      })
      .then(function(relationship){
        return relationship.delete();
      })
      .then(function(relationship){
        expect(relationship.update).to.equal("update");
        done();
      });
  });

  it("Should be able to delete", function(done){
    var relationshipId;
    createRelationship('this is an id')
      .then(function(relationship){
        relationshipId = relationship.id;
        done();
        return createUser('test user', 'testy');
      })
      .then(function(user){
        return updateUser('this is an id', {relationshipId: relationshipId});
      })
      .then(function(user){
        return deleteRelationship('test user');
      })
      .then(function(relationship){
        expect(relationship).to.exist;
        return deleteUser('test user');
      })
      .then(function(user){
        done();
      });
  });
});

describe("Post", function(){

  var relationshipId;
  var postId;
  var userId;

  // it('should be able to add', function(done){
  //   createRelationship('this is a test')
  //     .then(function(relationship){
  //       console.log(relationship);
  //       relationshipId = relationship.id;
  //       return createUser('miley', 'a little strange');
  //     })
  //     .then(function(user){
  //       console.log(user);
  //       userId = user.id;
  //       return User.get(user.id).update({relationshipId: relationshipId}).run();
  //     })
  //     .then(function(user){
  //       return createPost('miley', {testing: 'testing'});
  //     })
  //     .then(function(post){
  //       console.log(post);
  //       postId = post.id;
  //       expect(post.testing).to.equal('testing');
  //       done();
  //     })
  // });

  // it('should be able to retrieve by user', function(done){
  //   getUserPosts('miley')
  //     .then(function(posts){
  //       expect(posts.length).to.equal(1);
  //       done();
  //     });
  // });

  // it('should be able to retrieve by relationship', function(done){
  //   getRelationshipPosts('miley')
  //     .then(function(posts){
  //       expect(posts.length).to.equal(1);
  //       done();
  //     });
  // });

  // it('should be able to update', function(done){
  //   getUserPosts('miley')
  //     .then(function(user){
  //       return updatePost(user[0].id, {sam: "is a hozer"});
  //     })
  //     .then(function(post){
  //       console.log(post);
  //       expect(post.sam).to.equal('is a hozer');
  //       done();
  //     });
  //   done();
  // });
 
  // it('should be able to delete', function(done){
  //   deletePost(postId)
  //     .then(function(post){
  //       expect(post.id).to.equal(postId);
  //       return Relationship.get(relationshipId).delete();
  //     })
  //     .then(function(relationship){
  //       User.get(userId).delete();
  //       done();
  //     });
  // });
})