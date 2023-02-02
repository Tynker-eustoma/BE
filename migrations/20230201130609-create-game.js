'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      anotherChoice1: {
        type: Sequelize.STRING
      },
      anotherChoice2: {
        type: Sequelize.STRING
      },
      anotherChoice3: {
        type: Sequelize.STRING
      },
      lvl: {
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable('Games');
  }
};