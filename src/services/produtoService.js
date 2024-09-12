const Produto = require('../models/Produto');

const adicionarProduto = ({ nome, quantidade, preco }) => {
    if (!nome || quantidade === undefined || preco === undefined) {
        throw new Error('Nome, quantidade e preço são necessários');
    }
    return Produto.adicionarProduto(nome, quantidade, preco);
};

const listarProdutos = () => {
    return Produto.listarProdutos();
};

module.exports = { adicionarProduto, listarProdutos };
