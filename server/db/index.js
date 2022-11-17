//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const History = require("./models/History");
const Favorite = require("./models/Favorite");

//associations could go here!
User.hasOne(History);
History.belongsTo(User);
User.hasOne(Favorite);
Favorite.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    History,
    Favorite,
  },
};
