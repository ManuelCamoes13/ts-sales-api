const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

class Venda extends Model {}

// Importar os outros modelos
const User = require('./User'); 
const Cliente = require('./Cliente'); 

Venda.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Nome da tabela associada ao modelo User
            key: 'id',
        }
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'clientes', // Nome da tabela associada ao modelo Cliente
            key: 'id',
        }
    },
    imposto: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Venda', // Nome do modelo
    tableName: 'vendas', // Nome da tabela no banco de dados
    timestamps: false, // Desativar timestamps (opcional)
});

// Definir associações
Venda.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

module.exports = Venda;
