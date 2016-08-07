var config = require('./config');
var thinky = require('thinky')(config);

var type = thinky.type;

var User = thinky.createModel("User", {
  id: type.string(),
  relationshipId: type.string(),
  email: type.string(),
  mood: type.string()
});

var Relationship = thinky.createModel("Relationship", {
  id: type.string(),
  calendarId: type.string(),
  wishlist: type.array()
});

User.belongsTo(Relationship, 'relationship', 'relationshipId', 'id');
Relationship.hasMany(User, 'users', 'id', 'relationshipId');

module.exports = {
  User: User,
  Relationship: Relationship,
  thinky: thinky
}