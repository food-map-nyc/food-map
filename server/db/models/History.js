const Sequelize = require("sequelize");
const db = require("../db");

const History = db.define("history", {
  restaurantId: {
    type: Sequelize.STRING,
  },
  restaurantName: {
    type: Sequelize.STRING,
  },
  timesVisited: {
    type: Sequelize.INTEGER,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = History;
