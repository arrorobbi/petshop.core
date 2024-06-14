"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MedicineTrackers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      medicineId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Medicines",
        },
      },
      used: {
        type: Sequelize.INTEGER,
      },
      dateOut: {
        type: Sequelize.DATE,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      volume: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("MedicineTrackers");
  },
};
