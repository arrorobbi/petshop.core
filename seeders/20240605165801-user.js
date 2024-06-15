'use strict';
const datadAdmin = require('./database/user.json');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const insert = datadAdmin.map((eachDatadAdmin) => {
      eachDatadAdmin.id = uuidv4();
      eachDatadAdmin.password = bcrypt.hashSync(
        eachDatadAdmin.password,
        +process.env.SALT_ROUNDS,
      );
      eachDatadAdmin.createdAt = new Date();
      eachDatadAdmin.updatedAt = new Date();
      return eachDatadAdmin;
    });
    await queryInterface.bulkInsert('Users', insert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
