'use strict';
const {
   Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   User.init({
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "Username is required",
            },
            notNull: {
               msg: "Username is required",
            },
         },
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: {
            msg: "Email already used, please use another email"
         },
         validate: {
            notEmpty: {
               msg: "Email is required",
            },
            notNull: {
               msg: "Email is required",
            },
            isEmail: {msg: "please input the correct email"}
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "Password is required",
            },
            notNull: {
               msg: "Password is required",
            },
            len: {
               args: [8],
               msg: "Password must have at least 8 character"
            }
         },
      },
      age: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "Age is required",
            },
            notNull: {
               msg: "Age is required",
            },
         },
      },
      lvlCount: DataTypes.INTEGER,
      lvlGuess: DataTypes.INTEGER,
      lvlLearn: DataTypes.INTEGER,
      role: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "role is required",
            },
            notNull: {
               msg: "role is required",
            },
         },
      },
   }, {
      sequelize,
      modelName: 'User',
   });

   User.beforeCreate((instance, options) => {
      instance.password = hashPassword(instance.password);
   });
   return User;
};