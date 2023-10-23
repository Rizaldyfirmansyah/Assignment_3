'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos", [{
      title: "Foto Pertama Milik UserId 1",
      caption: "ini foto pertama milik UserId 1",
      image_url: "https://tse3.mm.bing.net/th?id=OIP.2R8HyuXcA3ijnbxOJsBj4AHaEK&pid=Api&P=0&h=220",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Foto Pertama Milik UserId 1",
      caption: "ini foto pertama milik UserId 2",
      image_url: "https://tse4.mm.bing.net/th?id=OIP.AyBHEUsL5O7EyYleqwzoaQAAAA&pid=Api&P=0&h=220",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
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
