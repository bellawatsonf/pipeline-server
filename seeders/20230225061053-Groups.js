"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          nama_group: "CORPORATE BUSINESS 1 GROUP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "CORPORATE BUSINESS 2 GROUP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "CORPORATE BUSINESS 3 GROUP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION ACEH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION BANJARMASI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group:
            "REGIONAL COMMERCIAL BUSINESS REGION SEMARANGREGIONAL COMMERCIAL BUSINESS REGION SEMARANG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION BANDUNG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION MAKASSAR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION MEDAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 1.2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION PALEMBANG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 1.1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION SURABAYA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     *
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
    await queryInterface.bulkDelete("Groups", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
