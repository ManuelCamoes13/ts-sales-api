const Produto = require('../models/Produto'); // Certifique-se de que o caminho está correto


// Adicionar produto
const adicionarProduto = async ({ nome, descricao, quantidade, preco, notas, quantidadeMinima, imagem, categoria_id }) => {
    if (!nome || quantidade === undefined || preco === undefined || !categoria_id) {
        throw new Error('Nome, quantidade, preço e categoria são necessários');
    }
    return await Produto.create({ nome, descricao, quantidade, preco, notas, quantidadeMinima, imagem, categoria_id });
};

// Atualizar produto
const atualizarProduto = async (id, { nome, descricao, quantidade, preco, notas, quantidadeMinima, imagem, categoria_id }) => {
    const produto = await Produto.findByPk(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    return await produto.update({ nome, descricao, quantidade, preco, notas, quantidadeMinima, imagem, categoria_id });
};

// Deletar produto
const deletarProduto = async (id) => {
    const produto = await Produto.findByPk(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    await produto.destroy();
};

// Obter um produto
const obterProduto = async (id) => {
    const produto = await Produto.findByPk(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    return produto;
};

// Listar produtos
const listarProdutos = async () => {
    return await Produto.findAll();
};

module.exports = { adicionarProduto, atualizarProduto, deletarProduto, obterProduto, listarProdutos };
