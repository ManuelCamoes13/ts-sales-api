module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cotacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      produto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produtos',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      validade: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('cotacoes');
  }
};
