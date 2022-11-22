const router = require("express").Router();
const axios = require("axios");
const { API_KEY } = require("../../secrets.js");
module.exports = router;

router.get ('/:term/:longitude/:latitude', async (req, res, next) => {
    try {
        const { data } = await axios.get(
            `https://api.yelp.com/v3/businesses/search`, 
             {
              params : {
                term:req.params.term,
                categories: 'restaurants',
                longitude: req.params.longitude,
                latitude: req.params.latitude,
                limit:5
              },
               headers:{
                 authorization: `Bearer ${API_KEY}`
               }
             })
             res.json(data)
            } catch (err) {
              next(err)
            }
  })

  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const { data } = await axios.get(
        `https://api.yelp.com/v3/businesses/${id}/reviews`,
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
  