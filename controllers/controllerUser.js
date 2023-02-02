const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {User, Category, Game} = require('../models')


class ControllerUser {

   static async register(req, res, next) {

      try {
         const { username, email, password, age } = req.body;

         const role = "user";
         const data = await User.create({ username, email, password, age, role });

         const newUser = {
            id: data.id,
            username: data.id,
         };

         res.status(201).json({ message: "Success create user", newUser });

   } catch(error){

      next(error);
   }
}

   static async login(req, res, next) {
      try {
      const { email, password } = req.body;

      const data = await User.findOne({
         where: {
            email,
         },
      });

      if (!data) {
         throw { messege: "Invalid Email/Password" };
      }

      const validate = hashPassword(password, data.password);

      if (!validate) {
         throw { messege: "Invalid Email/Password" };
      }

      const payload = {
         id: data.id,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token });

      } catch(error){

      next(error);
      
      }
   }


   static async allCategory (req, res, next){
      
      try {
         
         const data = await Category.findAll({
            order:[['createdAt', 'ASC']]
         })

         res.status(200).json(data)

      } catch (error) {
         next(error)
      }
   }


   static async getGameById (req, res, next){

      try {

         const {categoryId} = req.params

         console.log(categoryId, ">>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<");
         
         const data = await Game.findAll({
            where: {
               CategoryId : categoryId
            }
         })

         res.status(200).json(data)

      } catch (error) {
         next(error)
      }

   }


   static async getGameByLevelAndCategory (req, res, next) {
      
      try {

         

      } catch (error) {
         
      }
   }
}

module.exports = ControllerUser;
