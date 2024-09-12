const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Verifique se está importando a instância correta do Sequelize

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users', // Nome da tabela no banco de dados
    timestamps: false,
});

module.exports = User;
