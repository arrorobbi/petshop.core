"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      adminId: DataTypes.UUID,
      ownerId: DataTypes.UUID,
      orderItemId: DataTypes.UUID,
      totalPrice: DataTypes.FLOAT,
      payment: DataTypes.STRING,
      paymentPhoto: DataTypes.STRING,
      estimateArrived: DataTypes.DATE,
      isPaid: DataTypes.BOOLEAN,
      isOnline: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
