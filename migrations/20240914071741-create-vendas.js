'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendas', {
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
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      codigoFactura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure invoice numbers are unique
      },
   
      imposto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      pago: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // valor padrão como false
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
    await queryInterface.dropTable('vendas');
  }
};
