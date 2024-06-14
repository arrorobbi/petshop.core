"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stationer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stationer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      doctorId: DataTypes.UUID,
      ambulatorId: DataTypes.UUID,
      photo: DataTypes.STRING,
      dateIn: DataTypes.DATE,
      dateOut: DataTypes.DATE,
      complaint: DataTypes.TEXT,
      treatment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Stationer",
    }
  );
  return Stationer;
};
