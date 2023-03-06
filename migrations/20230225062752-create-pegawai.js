"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pegawais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nip: {
        type: Sequelize.STRING,
        unique: true,
      },
      nama_pegawai: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      posisi: {
        type: Sequelize.STRING,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Groups",
          id: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      level: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pegawais");
  },
};
