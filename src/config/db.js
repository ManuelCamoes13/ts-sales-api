const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('carecatubos', 'root', '', {
    host: 'localhost',
    port: 3306, // Porta padrão do MySQL
    dialect: 'mysql',
    logging: false, // Desativa logs SQL no console
    define: {
        timestamps: false, // Desativa timestamps automáticos nas tabelas
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('? Conexão com o banco de dados estabelecida com sucesso.');
    } catch (err) {
        console.error('? Erro ao conectar ao banco de dados:', err.message);
        process.exit(1); // Encerra a aplicação em caso de falha na conexão
    }
})();

module.exports = sequelize;
