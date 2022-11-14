const Sequelize = require("sequelize");
const db = require("../db");

const History = db.define("history", {
  restaurants: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [],
  },
});

module.exports = History;
