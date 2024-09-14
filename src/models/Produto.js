const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./Categoria'); // Importar o modelo de Categoria, que será a chave estrangeira

// Definição do modelo Produto
const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true, // Notas podem ser opcionais
    },
    quantidade_de_stock_baixo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5, // Valor padrão para quando a quantidade de estoque está baixa
    },
    imagem: {
        type: DataTypes.STRING, // Pode armazenar o caminho ou URL da imagem
        allowNull: true,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    tableName: 'produtos',
    timestamps: false,
});

module.exports = Produto;
