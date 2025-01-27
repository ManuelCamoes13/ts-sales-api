'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configuracoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome_empresa: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nuit: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true, // Validação para garantir que seja um e-mail válido
        }
      },
      site: {
        type: Sequelize.STRING(50),
        allowNull: true, // Número pode ser opcional
      },
      telefone1: {
        type: Sequelize.STRING(15),
        allowNull: true, // Telefone 1 pode ser opcional
      },
      telefone2: {
        type: Sequelize.STRING(15),
        allowNull: true, // Telefone 2 pode ser opcional
      },
      endereco: {
        type: Sequelize.STRING(255),
        allowNull: true, // Endereço pode ser opcional
      },
      bci: {
        type: Sequelize.STRING(255),
        allowNull: true, // Endereço pode ser opcional
      },
      bim: {
        type: Sequelize.STRING(255),
        allowNull: true, // Endereço pode ser opcional
      },
      mpesa: {
        type: Sequelize.STRING(255),
        allowNull: true, // Endereço pode ser opcional
      },
      emola: {
        type: Sequelize.STRING(255),
        allowNull: true, // Endereço pode ser opcional
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão como o timestamp atual
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão como o timestamp atual
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('configuracoes');
  },
};
