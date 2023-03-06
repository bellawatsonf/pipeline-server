"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pipelines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_nasabah: {
        type: Sequelize.STRING,
      },
      limit: {
        type: Sequelize.STRING,
      },
      id_pengajuan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "StatusPengajuans",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      tgl_RKP_A: {
        type: Sequelize.DATE,
      },
      tgl_RKP_B: {
        type: Sequelize.DATE,
      },
      tgl_cair: {
        type: Sequelize.DATE,
      },
      id_progress: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Progresses",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      tgl_proyeksi_cair_rpm: {
        type: Sequelize.DATE,
      },
      status_archive: {
        type: Sequelize.BOOLEAN,
      },
      id_pegawai: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Pegawais",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("Pipelines");
  },
};
