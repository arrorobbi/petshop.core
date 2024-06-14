"use strict";
const { Model } = require("sequelize");
const { bcrypthash } = require("../misc/bcyrpt.helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "address",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (User) => {
          User.password = await bcrypthash(
            User.password,
            +process.env.SALT_ROUNDS
          );
          return User;
        },
        beforeUpdate: async (User) => {
          if (User.password) {
            console.log(User.password);
            const salt = +process.env.SALT_ROUNDS;
            User.password = await bcrypthash(User.password, salt);
          }
        },
      },
    }
  );
  return User;
};
