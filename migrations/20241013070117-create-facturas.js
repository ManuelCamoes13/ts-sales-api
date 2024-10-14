const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('facturas', {
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
    
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      codigoFactura: {
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
    await queryInterface.dropTable('facturas');
  }
};
