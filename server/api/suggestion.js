const router = require('express').Router()
const axios = require('axios')
const {API_KEY} = require('../../secrets.js')
module.exports = router

router.get ('/:term/:longitude/:latitude', async (req, res, next) => {
    try {
        const { data } = await axios.get(
            `https://api.yelp.com/v3/businesses/search`, 
             {
              params : {
                term: req.params.term,
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