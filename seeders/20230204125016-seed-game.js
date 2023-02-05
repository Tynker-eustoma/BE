'use strict';

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
    const counting = require('../db/counting.json')
    counting.forEach(el => {
     el.createdAt = el.updatedAt = new Date()
    })

    const categories = require('../db/category.json')
    categories.forEach(el => {
     el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Categories', categories)
    await queryInterface.bulkInsert('Games', counting)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Games', null, {})
  }
};
