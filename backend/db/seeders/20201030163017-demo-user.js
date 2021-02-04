'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo-',
        lastName: 'lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fake@user1.io',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'fake@user2.io',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'fake@user1.io', 'fake@user2.io'] }
    }, {});
  }
};
