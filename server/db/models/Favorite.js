const Sequelize = require("sequelize");
const db = require("../db");

const Favorite = db.define("favorite", {
  restaurantId: {
    type: Sequelize.INTEGER,
  },
  restaurantName: {
    type: Sequelize.STRING,
  },
});

module.exports = Favorite;
