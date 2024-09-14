// models/Cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Cliente
const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nuit: {
        type: DataTypes.STRING(9),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    contacto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    }
}, {
    tableName: 'clientes',
    timestamps: true, // Habilita as colunas createdAt e updatedAt
});

module.exports = Cliente;
