"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      dateIn: DataTypes.DATE,
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      expired: DataTypes.DATE,
      batchCode: DataTypes.STRING,
      factory: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
