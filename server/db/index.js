//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const History = require("./models/History");
const Wishlist = require("./models/Wishlist");

//associations could go here!
User.hasOne(History);
History.belongsTo(User);
User.hasOne(Wishlist);
Wishlist.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    History,
    Wishlist,
  },
};
