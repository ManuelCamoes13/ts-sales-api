'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Dados do cliente
    const clientes = [
      {
        nome: 'Cliente Geral',
        nuit: '123456789', // Certifique-se de que o tamanho é de até 9 caracteres
        email: 'clientegeral@carecatubos.co.mz',
        contacto: '00000000',
        endereco: 'Endereço não especificado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Verificando o comprimento do nuit
    if (clientes[0].nuit.length > 9) {
      console.error('Erro: O campo nuit não pode ter mais de 9 caracteres');
      return;
    }

    try {
      // Inserção dos dados na tabela 'clientes'
      await queryInterface.bulkInsert('clientes', clientes, {});
      console.log('Clientes inseridos com sucesso');
    } catch (error) {
      console.error('Erro ao inserir clientes:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remover o cliente específico no rollback
      await queryInterface.bulkDelete('clientes', {
        nome: 'Cliente Geral', // Remover apenas o cliente que foi inserido
      }, {});
      console.log('Cliente removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover cliente:', error.message);
    }
  },
};
