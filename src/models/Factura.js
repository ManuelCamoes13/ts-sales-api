// models/Factura.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Factura
const Factura = sequelize.define('Factura', {
    venda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendas',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    codigoFactura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure invoice numbers are unique
      },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
