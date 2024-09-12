const db = require('../config/db');

// Adicionar produto
const adicionarProduto = (nome, quantidade, preco) => {
    const query = 'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [nome, quantidade, preco], (err) => {
            if (err) {
                return reject(new Error('Erro ao adicionar produto'));
            }
            resolve();
        });
    });
};

// Listar produtos
const listarProdutos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM produtos', (err, resultados) => {
            if (err) {
                return reject(new Error('Erro ao obter produtos'));
            }
            resolve(resultados);
        });
    });
};

module.exports = { adicionarProduto, listarProdutos };
