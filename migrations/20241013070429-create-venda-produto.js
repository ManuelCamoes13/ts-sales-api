'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('venda_produtos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      venda_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'vendas', // Nome da tabela de vendas
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'produtos', // Nome da tabela de produtos
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      preco_unitario: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('venda_produtos');
  }
};
