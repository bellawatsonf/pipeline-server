"use strict";

const { encrypt } = require("../helper/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pegawais",
      [
        {
          nip: "00000",
          password: encrypt("admin"),
          nama_pegawai: "Super Admin",
          posisi: "Super Admin",
          lokasi: "Super Admin",
          group_id: 1,
          level: "super admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
    await queryInterface.bulkDelete("Pegawais", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
