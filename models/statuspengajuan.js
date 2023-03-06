"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusPengajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StatusPengajuan.hasMany(models.Pipeline, {
        as: "StatusPengajuan",
        foreignKey: "id_pengajuan",
      });
      // define association here
    }
  }
  StatusPengajuan.init(
    {
      nama_pengajuan: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "StatusPengajuan",
    }
  );
  return StatusPengajuan;
};
