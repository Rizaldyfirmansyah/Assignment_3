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

    await queryInterface.bulkInsert('Photos', [{
        title: 'Foto Futsal',
        caption: 'Foto Timnas',
        image_url: 'https://tse3.mm.bing.net/th?id=OIP.2R8HyuXcA3ijnbxOJsBj4AHaEK&pid=Api&P=0&h=220',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Foto Sepakbola',
        caption: 'Foto Timnas Sepakbola',
        image_url: 'https://tse4.mm.bing.net/th?id=OIP.AyBHEUsL5O7EyYleqwzoaQAAAA&pid=Api&P=0&h=220',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
