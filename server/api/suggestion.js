const router = require('express').Router()
const axios = require('axios')
const {API_KEY} = require('../../secrets.js')
module.exports = router

router.get ('/', async (req, res, next) => {
    try {
      const searchParams= req.params.searchParams
        const { data } = await axios.get(
            `https://api.yelp.com/v3/businesses/search`, 
             {
              params : {
                term: 'carribean',
                location: 'brooklyn',
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