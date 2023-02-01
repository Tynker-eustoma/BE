'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      })
    }
  }
  Game.init({
    imgUrl: DataTypes.STRING,
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Answer is required",
        },
        notNull: {
          msg: "Answer is required",
        },
      },
    },
    anotherChoice1: DataTypes.STRING,
    anotherChoice2: DataTypes.STRING,
    anotherChoice3: DataTypes.STRING,
    lvl: DataTypes.INTEGER,
    question: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};