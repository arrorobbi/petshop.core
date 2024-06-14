"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "owner",
      });
    }
  }
  Patient.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ownerId: DataTypes.UUID,
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      petType: DataTypes.STRING,
      colour: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      race: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
