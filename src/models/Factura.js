// models/Factura.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Factura
const Factura = sequelize.define('Factura', {
    vendaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendas',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
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
    tableName: 'facturas',
    timestamps: true, // Habilita as colunas createdAt e updatedAt
});

module.exports = Factura;
