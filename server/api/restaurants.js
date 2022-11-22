const router = require("express").Router();
const axios = require("axios");
const { API_KEY } = require("../../secrets");
module.exports = router;

router.get("/featured", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        params: {
          location: "NYC",
          term: "restaurants",
          sort_by: "review_count",
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/page/:number", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        params: {
          location: "NYC",
          term: "restaurants",
          offset: (req.params.number - 1) * 50,
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:cuisine/:page", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        params: {
          location: "NYC",
          term: "restaurants",
          offset: (req.params.page - 1) * 50,
          categories: req.params.cuisine,
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:borough/:page", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        params: {
          location: req.params.borough,
          term: "restaurants",
          offset: (req.params.page - 1) * 50,
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:borough/:cuisine/:page", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        params: {
          location: req.params.borough,
          categories: req.params.cuisine,
          term: "restaurants",
          offset: (req.params.page - 1) * 50,
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}`,
      {
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});
