const { hashPassword, compareHash } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User, Category, Game} = require('../models')

class ControllerAdmin {
   
   static async register(req, res, next){
      
      try {
         
         const {username, email, password, age} = req.body
         
         const role = 'admin'
         const data = await User.create({username, email, password, age, role})

         const newUser = {
            id: data.id, 
            username: data.username
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
            throw {name: 'Invalid Email/Password'}
         }

         const validate = compareHash(password, data.password)

         if(!validate){
            throw {name: 'Invalid Email/Password'}
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


   static async createCategory (req, res, next) {
      
      try {

         const {name} = req.body

         await Category.create({name})

         res.status(201).json({message: `Create category ${name} success`})

      } catch (error) {
         next(error)
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

   static async deleteCategory(req, res, next){
      
      try {
         
         const {id} = req.params

         const check = await Category.findOne({
            where: {
               id
            }
         })

         if(!check){
            throw {name: 'Category id not found'}
         }
         
         await Category.destroy({
            where:{
               id
            }
         })

         res.status(200).json({message: `Success delete category with id = ${id}`})

      } catch (error) {
         
         next(error)
      }
   }


   static async updateCategory(req, res, next){
      
      try {
         
         const {id} = req.params
         const {name} = req.body

         const check = await Category.findOne({
            where: {
               id
            }
         })

         if(!check){
            throw {name: 'Category id not found'}
         }

         await Category.update({name}, {
            where: {
               id
            }
         })

         res.status(200).json({message: `Success update category whit id = ${id}`})

      } catch (error) {
         
         next(error)
      }

   }

   static async createGame(req, res, next) {
      
      try {
         
         const {imgUrl, 
            answer, optionA, 
            optionB, 
            optionC, optionD, lvl,
            question, 
            CategoryId
         } = req.body

         if(CategoryId !==3 && !optionA || CategoryId !==3 && !optionB || CategoryId !==3 && !optionC || CategoryId !==3 && !optionD){

            throw {name: "Choice required for Counting & Guess games"}
         }

         if(CategoryId !==3 && !imgUrl){

            throw {name: "Image Url required for Counting & Guess games"}
         }

         await Game.create({imgUrl, answer, optionA, optionB, optionC, optionD, lvl, question, CategoryId})

         res.status(201).json({message: 'Success create games'})

      } catch (error) {
         next(error)
      }

   }


   static async allGames(req, res, next){
      

      try {
         
         const data = await Game.findAll({
            order:[['createdAt', 'DESC']],
            include: {
               model: Category
            }
         })

         res.status(200).json(data)

      } catch (error) {
         next(error)
      }

   }


   static async deleteGame(req, res, next){
      
      try {
         
         const {id} = req.params

         const check = await Game.findOne({
            where: {
               id
            }
         })

         if(!check){
            throw {name: 'Game id not found'}
         }
         
         await Game.destroy({
            where:{
               id
            }
         })

         res.status(200).json({message: `Success delete game with id = ${id}`})

      } catch (error) {
         
         next(error)
      }
   }


   static async updateGame(req, res, next){


      try {
         
         const {id} = req.params

         const {imgUrl, 
            answer, anotherChoice1, 
            anotherChoice2, 
            anotherChoice3, lvl,
            question, 
            CategoryId
         } = req.body

         if(CategoryId !==3 && !anotherChoice1 || CategoryId !==3 && !anotherChoice2 || CategoryId !==3 && !anotherChoice3){

            throw {name: "Choice required for Counting & Guess games"}
         }

         if(CategoryId !==3 && !imgUrl){

            throw {name: "Image Url required for Counting & Guess games"}
         }

         const check = await Game.findOne({
            where: {
               id
            }
         })

         if(!check){
            throw {name: 'Game id not found'}
         }

         await Game.update({imgUrl, answer, anotherChoice1, anotherChoice2, anotherChoice3, lvl, question, CategoryId}, {
            where: {
               id
            }
         })

         res.status(200).json({message: `Success update game with id = ${id}`})

      } catch (error) {
         next(error)
      }
   }
}


module.exports = ControllerAdmin