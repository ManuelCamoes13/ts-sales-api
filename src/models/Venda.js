// models/venda.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

class Venda extends Model {}

Venda.init({
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id',
        }
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    custoMaoObra: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imposto: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Venda',
    tableName: 'vendas',
    timestamps: false,
});

module.exports = Venda;
