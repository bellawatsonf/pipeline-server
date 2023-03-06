"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Progresses",
      [
        {
          nama_progress: "COLLECT DOKUMEN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_progress: "MEETING PIPELINE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_progress: "PROSES NAP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_progress: "PROSES RKP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_progress: "FINALISASI NOTA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_progress: "PROSES AKAD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Prgresses", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
