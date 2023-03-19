"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pipeline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pipeline.belongsTo(models.StatusPengajuan, {
        foreignKey: "id_pengajuan",
      });
      Pipeline.belongsTo(models.Progress, { foreignKey: "id_progress" });
      Pipeline.belongsTo(models.Pegawai, { foreignKey: "id_pegawai" });
      Pipeline.belongsTo(models.Sector, { foreignKey: "id_sector" });
      // define association here
    }
  }
  Pipeline.init(
    {
      nama_nasabah: DataTypes.STRING,
      limit: DataTypes.STRING,
      id_pengajuan: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "pengajuan id must be fill",
          },
        },
      },
      tgl_RKP_A: DataTypes.DATE,
      tgl_RKP_B: DataTypes.DATE,
      tgl_proyeksi: DataTypes.DATE,
      id_progress: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "progress id must be fill",
          },
        },
      },
      status_archive: DataTypes.BOOLEAN,
      nominal_cair: DataTypes.STRING,
      id_pegawai: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "pegawai id must be fill",
          },
        },
      },
      id_sector: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "sector id must be fill",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Pipeline",
    }
  );
  return Pipeline;
};
