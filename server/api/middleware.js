const { models: { User },} = require("../db");

const checkUser = async (req, res, next) => {
    try{
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user =  user
    next()
    }catch(err){
      console.log(err)
      res.sendStatus(403);
    }
  }

  module.exports = {
    checkUser,
  };