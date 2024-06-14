"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      adminId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      ownerId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      orderItemId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "OrderItems",
        },
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentPhoto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimateArrived: {
        type: Sequelize.DATE,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
      },
      isOnline: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
