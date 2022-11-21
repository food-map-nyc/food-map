const Sequelize = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  restaurantId: {
    type: Sequelize.STRING,
  },
  restaurantName: {
    type: Sequelize.STRING,
  },
});

module.exports = Wishlist;
