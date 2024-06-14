"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicineTracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicineTracker.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      medicineId: DataTypes.UUID,
      used: DataTypes.INTEGER,
      dateOut: DataTypes.DATE,
      qty: DataTypes.INTEGER,
      volume: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MedicineTracker",
    }
  );
  return MedicineTracker;
};
