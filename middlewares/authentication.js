const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models')

const authenticationAdmin = async (req, res, next) => {

   try {
      
      const {access_token} = req.headers;

      if(!access_token){
         throw {messege: 'Invalid token'}
      }

      const data = verifyToken(access_token)

      const findUser = await User.findByPk(data.id)

      if(!findUser){
         throw {messege: 'Invalid token'}
      }


      req.user = {
         lvlCount: findUser.lvl,
         lvlGuess: findUser.lvlGuess, 
         lvlLearn: findUser.lvlLearn
      }


      next()

   } catch (error) {
      next(error)
   }
}


module.exports = authenticationAdmin