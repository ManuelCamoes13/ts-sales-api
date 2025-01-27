// models/VendaMaoDeObra.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class VendaMaoDeObra extends Model {}

VendaMaoDeObra.init({
    venda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendas',
            key: 'id',
        }
    },
    mao_de_obra_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'mao_de_obras', // Supondo que há uma tabela de mãos-de-obra
            key: 'id',
        }
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'VendaMaoDeObra',
    tableName: 'venda_mao_de_obras',
    timestamps: false,
});

module.exports = VendaMaoDeObra;
