module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recibos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      factura_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'facturas',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      tipo_pagamento: {
        type: Sequelize.ENUM('cheque', 'numerario'), // Define os tipos de pagamento possíveis
        allowNull: false,
      },
      numero_cheque: {
        type: Sequelize.STRING,
        allowNull: true, // Pode ser nulo se o tipo de pagamento não for cheque
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
    await queryInterface.dropTable('recibos');
  }
};
