"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sectors",
      [
        {
          nama_sector: "KONSTRUKSI & INFRASTRUKTUR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "JASA KESEHATAN            ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "KELAPA SAWIT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI KERTAS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "JASA KEUANGAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "KETENAGALISTRIKAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "JASA PENDIDIKAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI MIGAS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI FARMASI & ALAT KESEHATAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "PERTAMBANGAN EMAS & PERAK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "TRANSPORTASI DARAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "TELEKOMUNIKASI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI PUPUK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "JASA LOGISTIK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI PENGOLAHAN DAGING & PAKAN TERNAK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI MAKANAN & MINUMAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI KIMIA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "PERTAMBANGAN BIJIH LOGAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "PERDAGANGAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "INDUSTRI PENGOLAHAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "TRANSPORTASI NON DARAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "JASA LAINNYA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "PROPERTI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "PERTAMBANGAN LAINNYA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_sector: "AGRIBISNIS (NON SAWIT)",
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
    await queryInterface.bulkDelete("Sectors", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
