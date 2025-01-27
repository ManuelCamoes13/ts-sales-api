// models/VendaProduto.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class VendaProduto extends Model {}

VendaProduto.init({
    venda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendas',
            key: 'id',
        }
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id',
        }
    },
    quantidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'VendaProduto',
    tableName: 'venda_produtos',
    timestamps: false,
});

module.exports = VendaProduto;
