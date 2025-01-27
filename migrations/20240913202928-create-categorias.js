module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorias', {
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
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'activo', // Define o valor padrão como 'pcs'
        validate: {
            isIn: [['activo', 'inactivo']], // Define que só pode ser 'pcs' ou 'cm'
        }
      },
      unidade: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pcs', // Define o valor padrão como 'pcs'
        validate: {
            isIn: [['pcs', 'metros']], // Define que só pode ser 'pcs' ou 'cm'
        }
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
    await queryInterface.dropTable('categorias');
  },
};
