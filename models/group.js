"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Pegawai, { as: "group", foreignKey: "group_id" });
    }
  }
  Group.init(
    {
      nama_group: {
        type: DataTypes.STRING,
      },
      initial_group: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
