const { compareHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {User, Category, Game} = require('../models')
const redis = require('../config/redis');
const e = require("express");
const nodemailer = require('nodemailer')


class ControllerUser {

   static mailer (sendto){
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "dicapricornus17@gmail.com",
            pass: "ylmdmaszkjrtfdoa"
          },
        });
        
        let mailOptions = {
          from: 'dicapricornus@gmail.com',
          to: sendto,
          subject: `Register successfully`,
          html: `You're successfully register in our site`,
        };
        
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err, "<<<<<<<")
          } else {
            console.log(info, "Berhasil kirim email <<<<<<<")
          }
        });
  }

   static async register(req, res, next) {
      try {
         const { username, email, password, age } = req.body;

         const role = "user";
         const data = await User.create({ username, email, password, age, role });

         const newUser = {
            id: data.id,
            username: data.username,
         };

         ControllerUser.mailer(data.email)

         res.status(201).json({ messege: "Success create user", newUser });

   } catch(error){

      next(error);
   }
}

   static async findUser(req, res, next){
      try {
         const {id} =  req.user

         const user = await User.findByPk(id, {attributes: {exclude: ['password']}})

         res.status(200).json(user)

      } catch (error) {
         next(error)
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
         const categoriesCache = await redis.get('tynker:categories')
         if (categoriesCache){
            const categories = JSON.parse(categoriesCache)
            console.log(categories, "<<<<")
            res.status(200).json(categories)
         } else {
            const data = await Category.findAll({ order:[['createdAt', 'ASC']] })
            await redis.set('tynker:categories', JSON.stringify(data))
            res.status(200).json(data)
         }

      } catch (error) {
         next(error)
      }
   }


   static async getCategoryById (req, res, next){

      try {

         const {categoryId} = req.params
         const categoriesByIdCache = await redis.get(`tynker:categories${categoryId}`)
         if (categoriesByIdCache){
            const categoriesById = JSON.parse(categoriesByIdCache)
            res.status(200).json(categoriesById)
         } else {
            const data = await Game.findAll({ where: { CategoryId : categoryId } })
            if (data.length == 0){
               throw {name: "Category id not found"}
            } else {
            await redis.set(`tynker:categories${categoryId}`, JSON.stringify(data))
            res.status(200).json(data)
            }
         }

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

         if (!data){
            throw {name: "Game id not found"}
         }

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
         const {lvl} = req.body

         const user = await User.findByPk(req.user.id)

         console.log(lvl, "lvl dari controllerrrrrrrrrrrrrrrrrrrrrr")

         if(+categoryId > 3) {
            throw {name: 'Category id not found'}
         }

         // Kondisi Update

         if(+categoryId === 1){
            if(user.lvlCount < +lvl){
               console.log('masukkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
               const lvlCount = user.lvlCount + 1
               await User.update({lvlCount}, {
                  where: {
                     id : req.user.id
                  }
               })
               req.user.lvlCount = lvlCount
            }
         }

         if(+categoryId === 2){
            if(user.lvlGuess < +lvl){
               const lvlGuess = user.lvlGuess + 1
               await User.update({lvlGuess}, {
               where: {
                  id : req.user.id
               }
            })
               req.user.lvlGuess = lvlGuess
            }
         }

         if(+categoryId === 3){
            if(user.lvlLearn < +lvl){
               const lvlLearn = user.lvlLearn + 1
               await User.update({lvlLearn}, {
               where: {
                  id : req.user.id
               }
            })
            req.user.lvlLearn = lvlLearn
            }
         }

         
         
         res.status(200).json({message: 'Success update level user with id =' + user.id})

      } catch (error) {
         
         next(error)
      }
   }
}

module.exports = ControllerUser;
