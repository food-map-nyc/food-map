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
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=170667a&w=0&k=20&c=P3jIQq8gVqlXjd4kP2OrXYyzqEXSWCwwYtwrd81psDY=",
  },
});

module.exports = History;
