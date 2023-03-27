"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          nama_group: "CORPORATE BUSINESS 1 GROUP",
          initial_group: "CB 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "CORPORATE BUSINESS 2 GROUP",
          initial_group: "CB 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "CORPORATE BUSINESS 3 GROUP",
          initial_group: "CB 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION ACEH",
          initial_group: "RCB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION BANJARMASI",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION SEMARANG",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 2",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION BANDUNG",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION MAKASSAR",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION MEDAN",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 1.2",
          initial_group: "RCBR",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION PALEMBANG",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION JAKARTA 1.1",
          initial_group: "RCB",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_group: "REGIONAL COMMERCIAL BUSINESS REGION SURABAYA",
          initial_group: "RCB",

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
