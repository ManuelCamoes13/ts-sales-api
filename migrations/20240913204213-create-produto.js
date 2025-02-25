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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      
      quantidadeMinima: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unidade: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pcs', // Define o valor padrão como 'pcs'
        validate: {
            isIn: [['pcs', 'cm']], // Define que só pode ser 'pcs' ou 'cm'
        }
    },
    
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'activo', // Define o valor padrão como 'pcs'
        validate: {
            isIn: [['activo', 'inactivo']], // Define que só pode ser 'pcs' ou 'cm'
        }
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
