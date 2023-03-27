"use strict";

const { encrypt } = require("../helper/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pegawais",
      [
        {
          nip: "88888",
          password: encrypt("12345"),
          nama_pegawai: "user tester",
          posisi: "tester",
          lokasi: "bekasi",
          group_id: 1,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
        {
          nip: "2185001923",
          password: encrypt("12345"),
          nama_pegawai: "YAYANDI GUSHAGIA",
          posisi: "CORPORATE BUSINESS SECTOR 1 DEPARTMENT HEAD",
          lokasi: "KANTOR PUSAT",
          group_id: 1,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2186005592",
          password: encrypt("12345"),
          nama_pegawai: "ARIF HIDAYAT",
          posisi: "CORPORATE BUSINESS SECTOR 1 DEPARTMENT HEAD",
          lokasi: "KANTOR PUSAT",
          group_id: 2,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2176001702",
          password: encrypt("12345"),
          nama_pegawai: "HERU KUSUMA WARDHANA",
          posisi: "CORPORATE BUSINESS SECTOR 1 DEPARTMENT HEAD",
          lokasi: "KANTOR PUSAT",
          group_id: 3,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2187004390",
          password: encrypt("12345"),
          nama_pegawai: "ACHMAD FALUTHY",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO I BANDA ACEH",
          group_id: 4,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2184001890",
          password: encrypt("12345"),
          nama_pegawai: "ALVADI MUHAMMAD IVALDI",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO IX BANJARMASIN",
          group_id: 5,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2184001161",
          password: encrypt("12345"),
          nama_pegawai: "ARRY ADITYA PRATAMA",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO VII SEMARANG",
          group_id: 6,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2178000297",
          password: encrypt("12345"),
          nama_pegawai: "BASUKI MARTYONO",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO V JAKARTA 2",
          group_id: 7,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2171000626",
          password: encrypt("12345"),
          nama_pegawai: "DEWI INTAN",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO VI BANDUNG",
          group_id: 8,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2184004373",
          password: encrypt("12345"),
          nama_pegawai: "HANS AFFRIANDY",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO X MAKASSAR",
          group_id: 9,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2178000857",
          password: encrypt("12345"),
          nama_pegawai: "MAISUR HILMI",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO II MEDAN",
          group_id: 10,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2179001399",
          password: encrypt("12345"),
          nama_pegawai: "SAMI GAUZI",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO IV JAKARTA 1",
          group_id: 11,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2183003542",
          password: encrypt("12345"),
          nama_pegawai: "TENGKU ABDULLAH SANI",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO III PALEMBANG",
          group_id: 12,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2179000558",
          password: encrypt("12345"),
          nama_pegawai: "TENGKU RIZALDI SYAHPUTRA",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO IV JAKARTA 1",
          group_id: 13,
          level: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2180000939",
          password: encrypt("12345"),
          nama_pegawai: "WICAKSONO NUR ANGKASA",
          posisi: "REGIONAL COMMERCIAL BUSINESS MANAGER",
          lokasi: "RO VIII SURABAYA",
          group_id: 14,
          level: "user",
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
