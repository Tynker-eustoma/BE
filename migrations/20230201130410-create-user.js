'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
      },
      username: {
         type: Sequelize.STRING
      },
      email: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
      },
      password: {
         type: Sequelize.STRING,
         allowNull: false
      },
      age: {
         type: Sequelize.INTEGER,
         allowNull: false
      },
      lvlCount: {
         type: Sequelize.INTEGER,
         defaultValue: 1
      }, 
      lvlGuess: {
         type: Sequelize.INTEGER,
         defaultValue: 1
      },
      lvlLearn: {
         type: Sequelize.INTEGER,
         defaultValue: 1
      },
      role: {
         type: Sequelize.STRING,
         allowNull: false
      },
      createdAt: {
         allowNull: false,
         type: Sequelize.DATE
      },
      updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
      }
   });
   },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};