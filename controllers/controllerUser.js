const { compareHash } = require("../helpers/bcrypt");
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
            username: data.username,
         };

         console.log(newUser, "<<<<<<<<<<<<<<<<<<<")

         res.status(201).json({ messege: "Success create user", newUser });

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
         throw { name: "Invalid Email/Password" };
      }

      const validate = compareHash(password, data.password);

      if (!validate) {
         throw { name: "Invalid Email/Password" };
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


   static async getCategoryById (req, res, next){

      try {

         const {categoryId} = req.params
         
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

         const {id} = req.params
         const {lvlCount, lvlGuess, lvlLearn} = req.user

         const data = await Game.findOne({
            where: {id}
         })

         if(data.CategoryId === 1 && lvlCount<data.lvl){

            throw {name: 'Your level is low to access this page'}
         }

         if(data.CategoryId === 2 && lvlGuess<data.lvl){
            
            throw {name: 'Your level is low to access this page'} 
         }

         if(data.CategoryId === 3 && lvlLearn<data.lvl){

            throw {name: 'Your level is low to access this page'}
         }

         res.status(200).json(data)
      } catch (error) {
         next(error)
      }
   }

   static async updateLevel(req, res, next){
      

      try {
         
         const {categoryId} = req.params

         const user = await User.findByPk(req.user.id)

         //error handling

         if(+categoryId > 3) {
            throw {name: 'Category id not found'}
         }

         // Kondisi Update

         if(+categoryId === 1){
            const lvlCount = user.lvlCount + 1
            await User.update({lvlCount}, {
               where: {
                  id : req.user.id
               }
            })
         }

         if(+categoryId === 2){

            const lvlGuess = user.lvlGuess + 1
            await User.update({lvlGuess}, {
               where: {
                  id : req.user.id
               }
            })
         }

         if(+categoryId === 3){

            const lvlLearn = user.lvlLearn + 1
            await User.update({lvlLearn}, {
               where: {
                  id : req.user.id
               }
            })
         }


         res.status(200).json({messege: 'Success update level user with id =' + user.id})

      } catch (error) {
         
         next(error)
      }
   }
}

module.exports = ControllerUser;
