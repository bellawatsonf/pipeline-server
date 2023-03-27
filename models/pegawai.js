"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pegawai.belongsTo(models.Group, { foreignKey: "group_id" });
      Pegawai.hasMany(models.Pipeline, {
        as: "pegawai",
        foreignKey: "id_pegawai",
      });
    }
  }
  Pegawai.init(
    {
      nip: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "nip already in use!",
        },
      },
      nama_pegawai: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
      },
      posisi: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      group_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "group id must be fill",
          },
        },
      },
      level: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (Pegawai, option) => {
          const hashedPassword = encrypt(Pegawai.password);
          Pegawai.password = hashedPassword;
        },
      },
      sequelize,
      modelName: "Pegawai",
    }
  );
  return Pegawai;
};
