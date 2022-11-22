const router = require('express').Router()
const axios = require('axios')
const {API_KEY} = require('../../secrets.js')
module.exports = router

router.get ('/:term/:longitude/:latitude', async (req, res, next) => {
    try {
        // o: these api calls all use the same address to make requests to... have
        //  any idea on how to optimize this?
        const { data } = await axios.get(
            `https://api.yelp.com/v3/businesses/search`, 
             {
              params : {
                term: "restaurants",
                // o: you can destructure req.params
                categories: req.params.term,
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