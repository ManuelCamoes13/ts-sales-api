// seeders/20240914000000-demo-user.js
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('1234', 10);

    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'carecatubos@gmail.com',
      password: hashedPassword,
      type: 'admin', // Ou o tipo que você desejar
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'carecatubos@gmail.com',
    }, {});
  }
};
