'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetHotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PetHotel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bookingId: DataTypes.UUID,
      dateOut: DataTypes.DATE,
      qty: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'PetHotel',
    },
  );
  return PetHotel;
};
