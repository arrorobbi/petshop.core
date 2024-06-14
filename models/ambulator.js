"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ambulator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ambulator.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bookingId: DataTypes.UUID,
      medicineTrackerId: DataTypes.UUID,
      toolId: DataTypes.UUID,
      qtyTool: DataTypes.INTEGER,
      volumeMedicine: DataTypes.INTEGER,
      qtyMedicine: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      vaccine: DataTypes.STRING,
      medicine: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ambulator",
    }
  );
  return Ambulator;
};
