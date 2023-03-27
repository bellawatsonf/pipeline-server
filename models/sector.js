"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sector.hasMany(models.Pipeline, {
        as: "sector",
        foreignKey: "id_sector",
      });

      // define association here
    }
  }
  Sector.init(
    {
      nama_sector: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "sector name already in use!",
        },
      },
    },
    {
      sequelize,
      modelName: "Sector",
    }
  );
  return Sector;
};
