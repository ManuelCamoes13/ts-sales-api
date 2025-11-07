'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categorias = [
      { nome: 'Ponteiras Métricas', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Ponteiras JIC', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Ponteiras BSP & NPT', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Diversos', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Tubos Push Lock', estado: 'activo', unidade: 'm', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Camisas Push Lock', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Tubos R1AT', estado: 'activo', unidade: 'm', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Camisas R1AT', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Tubos R2AT', estado: 'activo', unidade: 'm', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Camisas R2AT', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Tubos 4SP – 4SH', estado: 'activo', unidade: 'm', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Camisas 4SP – 4SH', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'High Temperatures', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Camisas – High Temperatures', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Hose Protect', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Soldaduras', estado: 'activo', unidade: 'pcs', createdAt: new Date(), updatedAt: new Date() },
    ];

    try {
      await queryInterface.bulkInsert('categorias', categorias, {});
      console.log('✅ Categorias inseridas com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inserir categorias:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('categorias', {
        nome: [
          'Ponteiras Métricas',
          'Ponteiras JIC',
          'Ponteiras BSP & NPT',
          'Diversos',
          'Tubos Push Lock',
          'Camisas Push Lock',
          'Tubos R1AT',
          'Camisas R1AT',
          'Tubos R2AT',
          'Camisas R2AT',
          'Tubos 4SP – 4SH',
          'Camisas 4SP – 4SH',
          'High Temperatures',
          'Camisas – High Temperatures',
          'Hose Protect',
          'Soldaduras',
        ],
      }, {});
      console.log('🧹 Categorias removidas com sucesso');
    } catch (error) {
      console.error('❌ Erro ao remover categorias:', error.message);
    }
  },
};
