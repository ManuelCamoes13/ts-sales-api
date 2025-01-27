// models/Configuracao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Supondo que a configuração de conexão esteja nesse arquivo

// Definição do modelo Configuracao
const Configuracao = sequelize.define('Configuracao', {
    nome_empresa: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nuit: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true, // Validação para garantir que seja um e-mail válido
        }
    },
    site: {
        type: DataTypes.STRING(50),
        allowNull: true, // Número pode ser opcional
    },
    telefone1: {
        type: DataTypes.STRING(15),
        allowNull: true, // Telefone 1 pode ser opcional
    },
    telefone2: {
        type: DataTypes.STRING(15),
        allowNull: true, // Telefone 2 pode ser opcional
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true, // Endereço pode ser opcional
    },
    bci: {
        type: DataTypes.STRING(255),
        allowNull: true, // BCI pode ser opcional
    },
    bim: {
        type: DataTypes.STRING(255),
        allowNull: true, // BIM pode ser opcional
    },
    mpesa: {
        type: DataTypes.STRING(255),
        allowNull: true, // MPESA pode ser opcional
    },
    emola: {
        type: DataTypes.STRING(255),
        allowNull: true, // Emola pode ser opcional
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
    tableName: 'configuracoes', // Define o nome da tabela
    timestamps: true, // Habilita as colunas createdAt e updatedAt
});

module.exports = Configuracao;
