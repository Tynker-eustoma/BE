'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const counting = JSON.parse(fs.readFileSync('./db/Counting.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    const guessing = JSON.parse(fs.readFileSync('./db/guessing.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    const learning = JSON.parse(fs.readFileSync('./db/learning.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    const categories = require('../db/category.json')
    categories.forEach(el => {
     el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Categories', categories)
    await queryInterface.bulkInsert('Games', counting)
    await queryInterface.bulkInsert('Games', guessing)
    await queryInterface.bulkInsert('Games', learning)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Categories', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
