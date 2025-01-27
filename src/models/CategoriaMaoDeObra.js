// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Categoria
const CategoriaMaoDeObra = sequelize.define('CategoriaMaoDeObra', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'activo', // Define o valor padrão como 'pcs'
        validate: {
            isIn: [['activo', 'inactivo']], // Define que só pode ser 'pcs' ou 'cm'
        }
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
    tableName: 'CategoriaMaoDeObra',
    timestamps: true, // Habilita as colunas createdAt e updatedAt
});

module.exports = CategoriaMaoDeObra;
