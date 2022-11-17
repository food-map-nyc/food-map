const router = require('express').Router()
const axios = require('axios')
const {API_KEY} = require('../../secrets.js')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
        const {data} = await axios.get('https://api.yelp.com/v3/businesses/search', {
        params:{
        location:"NYC",
        term:"resturants",
        limit: 50
              },
        headers:{
        Authorization: `Bearer ${API_KEY}`
        }
        })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get ('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const { data } = await axios.get(
            `https://api.yelp.com/v3/businesses/${id}`, 
             {
               headers:{
                 authorization: `Bearer ${API_KEY}`
               }
             })
             res.json(data)
            } catch (err) {
              next(err)
            }
})

router.get ('/suggestion', async (req, res, next) => {
  try {
      const { data } = await axios.get(
          `https://api.yelp.com/v3/businesses/search`, 
           {
            params : {searchParams},
             headers:{
               authorization: `Bearer ${API_KEY}`
             }
           })
           res.json(data)
          } catch (err) {
            next(err)
          }
})

