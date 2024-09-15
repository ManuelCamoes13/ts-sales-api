module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id',
        },
        allowNull: true, // Pode ser null caso não seja sempre obrigatório
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      notas: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidadeMinima: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('produtos');
  }
};
