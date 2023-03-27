"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "StatusPengajuans",
      [
        {
          nama_pengajuan: "BARU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_pengajuan: "TAMBAHAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_pengajuan: "EKSISTING",
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
    await queryInterface.bulkDelete("StatusPengajuans", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
