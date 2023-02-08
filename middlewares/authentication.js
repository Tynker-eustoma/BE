const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models')

const authenticationAdmin = async (req, res, next) => {

   try {
      
      const {access_token} = req.headers;
      console.log(access_token)

      if(!access_token){
         throw {name: 'Invalid token'}
      }

      const data = verifyToken(access_token)

      const findUser = await User.findByPk(data.id)

      if(!findUser){
         throw {name: 'Invalid token'}
      }

      if(findUser.role !== "admin"){
         throw {name: "only admin can access this page"}
      }


      req.user = {
         id: findUser.id,
         lvlCount: findUser.lvlCount,
         lvlGuess: findUser.lvlGuess, 
         lvlLearn: findUser.lvlLearn
      }


      next()

   } catch (error) {
      next(error)
   }
}


module.exports = authenticationAdmin