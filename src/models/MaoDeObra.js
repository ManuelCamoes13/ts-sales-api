// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./CategoriaMaoDeObra');

// Definição do modelo Categoria
const MaoDeObra = sequelize.define('MaoDeObra', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id',
        },
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
// Definindo a associação
MaoDeObra.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
module.exports = MaoDeObra;
