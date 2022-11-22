const router = require("express").Router();
const {
  models: { User, History, Wishlist },
} = require("../db");
const { checkAdmin, checkUser } = require("./middleware");
module.exports = router;

router.get("/", checkUser, checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/history", checkUser, async (req, res, next) => {
  try {
    const history = await History.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/wishlist", async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", checkUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/history", checkUser, async (req, res, next) => {
  try {
    const history = await History.findOne({
      where: {
        userId: req.params.id,
        restaurantId: req.body.id,
      },
    });
    const newVisit = history.dataValues.timesVisited + 1;
    await history.update({ timesVisited: newVisit });
    const allRestaurants = await History.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(allRestaurants);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/history", checkUser, async (req, res, next) => {
  try {
    const history = await History.create({
      restaurantId: req.body.id,
      restaurantName: req.body.name,
      userId: req.params.id,
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/wishlist", checkUser, async (req, res, next) => {
  try {
    const wishlist = await Wishlist.create({
      restaurantId: req.body.id,
      restaurantName: req.body.name,
      userId: req.params.id,
    });
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/favorites", checkUser, async (req, res, next) => {
  try {
    const favorite = await History.findOne({
      where: {
        userId: req.params.id,
        restaurantId: req.body.id,
      },
    });
    const isFavorite = favorite.dataValues.favorite;
    await favorite.update({ favorite: !isFavorite });
    const allRestaurants = await History.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(allRestaurants);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:id/wishlist/:restaurantId",
  checkUser,
  async (req, res, next) => {
    try {
      const wishlist = await Wishlist.findOne({
        where: {
          restaurantId: req.params.restaurantId,
          userId: req.params.id,
        },
      });
      await wishlist.destroy();
      res.json(wishlist);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkUser, checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(err);
  }
});
