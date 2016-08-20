var config = require('./testConfig');
var expect = require('chai').expect;
var _ = require('lodash');
var db = require('../server/db/database.js');
var controllers = require('../server/db/controllers.js');

describe("User Controllers", function(){
  var createUser = controllers.createUser,
      getUserByEmail = controllers.getUserByEmail,
      updateUser = controllers.updateUser,
      deleteUser = controllers.deleteUser;

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
        console.log(user);
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

})

// module.exports = {
//   createUser: createUser,
//   getUserByEmail: getUserByEmail,
//   updateUser: updateUser,
//   deleteUser: deleteUser,
//   createRelationship: createRelationship,
//   getRelationshipByEmail: getRelationshipByEmail,
//   updateRelationship: updateRelationship,
//   createPost: createPost,
//   deletePost: deletePost,
//   getRelationshipPosts: getRelationshipPosts,
//   User: User,
//   Post: Post,
//   Relationship: Relationship
// }