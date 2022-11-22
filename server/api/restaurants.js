const router = require("express").Router();
const axios = require("axios");
const { API_KEY } = require("../../secrets");
module.exports = router;

// o: let's talk a little about these restful routes

router.get("/featured", async (req, res, next) => {
  try {
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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

// o: this would be better as /api/restaurants?pages=page
router.get("/page/:number", async (req, res, next) => {
  try {
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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

// o: this would be better as /cuisines/:cuisine?pages=page
router.get("/:cuisine/:page", async (req, res, next) => {
  try {
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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
    // o: these api calls all use the same address to make requests to... have
    //  any idea on how to optimize this?
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