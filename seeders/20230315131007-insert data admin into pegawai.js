"use strict";
const { encrypt } = require("../helper/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pegawais",
      [
        {
          nip: "12345",
          password: encrypt("admin"),
          nama_pegawai: "Admin",
          posisi: "Admin",
          lokasi: "Admin",
          group_id: 1,
          level: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pegawais", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
