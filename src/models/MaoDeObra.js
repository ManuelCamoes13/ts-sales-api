// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Categoria
const Categoria = sequelize.define('MaoDeObra', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    }
}, {
    tableName: 'mao_de_obra',
    timestamps: true, // Habilita as colunas createdAt e updatedAt
});

module.exports = Categoria;
