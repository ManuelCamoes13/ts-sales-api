const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

class Venda extends Model {}

// Importar os outros modelos
const User = require('./User'); 
const Cliente = require('./Cliente'); 
const Produto = require ('./Produto')
const MaoDeObra = require('./MaoDeObra')
const Factura = require('./Factura');

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
    // produto_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'produtos', // Nome da tabela associada ao modelo Cliente
    //         key: 'id',
    //     }
    // },
    // mao_de_obra_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'mao_de_obra', // Nome da tabela associada ao modelo Cliente
    //         key: 'id',
    //     }
    // },
    imposto: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    desconto: {
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
Venda.hasOne(Factura, { foreignKey: 'venda_id', as: 'factura' });
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
Venda.belongsToMany(Produto, { through: 'venda_produtos', foreignKey: 'venda_id', otherKey: 'produto_id', as: 'produtos' });
Venda.belongsToMany(MaoDeObra, { through: 'venda_mao_de_obras', foreignKey: 'venda_id', otherKey: 'mao_de_obra_id', as: 'mao_de_obras' });


module.exports = Venda;
