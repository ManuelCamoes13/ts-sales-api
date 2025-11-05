const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cotacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      venda_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vendas',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      recibo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recibos',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      codigoCotacao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure invoice numbers are unique
      },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
