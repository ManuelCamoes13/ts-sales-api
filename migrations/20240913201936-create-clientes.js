module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nuit: {
        type: Sequelize.STRING(9),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      contacto: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      endereco: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};
