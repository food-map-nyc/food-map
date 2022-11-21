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
    defaultValue: 1,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = History;
