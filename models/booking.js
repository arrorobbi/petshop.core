"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      doctorId: DataTypes.UUID,
      patientId: DataTypes.UUID,
      date: DataTypes.DATE,
      prpopose: DataTypes.STRING,
      queueNumber: DataTypes.STRING,
      isScanned: DataTypes.BOOLEAN,
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
