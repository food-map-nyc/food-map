const router = require("express").Router();
const {
  models: { User, History },
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
    console.log(req.params);
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/history", async (req, res, next) => {
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
        id: req.body.id,
      },
    });
    console.log(history);
    const newVisit = history.dataValues.timesVisited + 1;
    res.json(await history.update({ timesVisited: newVisit }));
    console.log(history);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkUser, checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(err);
  }
});
