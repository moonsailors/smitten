var config = require('./config');
var thinky = require('thinky')(config);

var type = thinky.type;

//Schemas 
/****************************/
var User = thinky.createModel("User", {
  id: type.string(),
  relationshipId: type.string(),
  email: type.string(),
  mood: type.string()
});

var Relationship = thinky.createModel("Relationship", {
  id: type.string(),
  calendarId: type.string(),
  // wishlist: type.array()
});

var Wish = thinky.createModel("Wish", {
  id: type.string(),
  relationshipId: type.string(),
  creatorId: type.string(),
  title: type.string(),
  description: type.string(),
  category: type.string(),
  api: type.string(),
  time: type.date().default(thinky.r.now())
});

//Relations
/*****************************/
User.belongsTo(Relationship, 'relationship', 'relationshipId', 'id');
Relationship.hasMany(User, 'users', 'id', 'relationshipId');

Wish.belongsTo(Relationship, 'relationship', 'relationshipId', 'id');
Relationship.hasMany(Wish, 'wishes', 'id', 'relationshipId');
Wish.belongsTo(User, 'user', 'creatorId', 'id');
User.hasMany(Wish, 'wishes', 'id', 'creatorId');



module.exports = {
  User: User,
  Relationship: Relationship,
  Wish: Wish,
  thinky: thinky
}