const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User} = require('../models')

class ControllerAdmin {
   
   static async register(req, res, next){
      
      try {
         
         const {username, email, password, age} = req.body
         
         const role = 'admin'
         const data = await User.create({username, email, password, age, role})

         const newUser = {
            id: data.id, 
            username: data.id
         }

         res.status(201).json({message: 'success create user', newUser})

      } catch (error) {
         next(error)
      }
   }




   static async login(req, res, next){
      

      try {
         
         const {email, password} = req.body

         const data = await User.findOne({
            where: {
               email
            }
         })

         if(!data){
            throw {messege: 'Invalid Email/Password'}
         }

         const validate = hashPassword(password, data.password)

         if(!validate){
            throw {messege: 'Invalid Email/Password'}
         }

         const payload = {
            id: data.id
         }

         const access_token = signToken(payload)

         res.status(200).json({access_token})

      } catch (error) {
         next(error)
      }
   }
}


module.exports = ControllerAdmin