"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Progress.hasMany(models.Pipeline, {
        as: "progress",
        foreignKey: "id_progress",
      });
      // define association here
    }
  }
  Progress.init(
    {
      nama_progress: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "progress name already in use!",
        },
      },
    },
    {
      sequelize,
      modelName: "Progress",
    }
  );
  return Progress;
};
