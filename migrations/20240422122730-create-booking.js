"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      doctorId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      patientId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Patients",
        },
      },
      date: {
        type: Sequelize.DATE,
      },
      propose: {
        type: Sequelize.STRING,
      },
      queueNumber: {
        type: Sequelize.STRING,
      },
      isScanned: {
        type: Sequelize.BOOLEAN,
      },
      isDone: {
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
    await queryInterface.dropTable("Bookings");
  },
};
