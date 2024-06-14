"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ambulators", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      bookingId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Bookings",
        },
      },
      medicineTrackerId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "MedicineTrackers",
        },
      },
      toolId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Tools",
        },
      },
      qtyTool: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      volumeMedicine: {
        type: Sequelize.INTEGER,
      },
      qtyMedicine: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vaccine: {
        type: Sequelize.STRING,
      },
      medicine: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Ambulators");
  },
};
