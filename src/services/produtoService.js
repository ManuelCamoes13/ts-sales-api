const Produto = require('../models/Produto'); // Certifique-se de que o caminho está correto
const Categoria = require('../models/Categoria');

// Adicionar produto
const adicionarProduto = async ({ nome, descricao, quantidade, preco, notas, quantidadeMinima, tipo, unidade, imagem, categoria_id }) => {
    if (!nome || quantidade === undefined || preco === undefined || !categoria_id) {
        throw new Error('Nome, quantidade, preço e categoria são necessários');
    }

    // Verifica se já existe um produto com o mesmo nome
    const produtoExistente = await Produto.findOne({ where: { nome } });
    if (produtoExistente) {
        throw new Error('Já existe um produto com este nome');
    }

    return await Produto.create({ nome, descricao, quantidade, preco, notas, quantidadeMinima, tipo, unidade, imagem, categoria_id });
};


// Atualizar produto
const atualizarProduto = async (id, { nome, descricao, quantidade, preco, notas, quantidadeMinima, tipo, unidade, imagem, categoria_id }) => {
    const produto = await Produto.findByPk(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    return await produto.update({ nome, descricao, quantidade, preco, notas, quantidadeMinima,tipo, unidade, imagem, categoria_id });
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

const listarProdutos = async () => {
    return await Produto.findAll({
        include: {
            model: Categoria,
            as: 'categoria', // Nome do alias definido na associação
            attributes: ['nome', 'unidade'], // Campos desejados
        },
    });
};

module.exports = { adicionarProduto, atualizarProduto, deletarProduto, obterProduto, listarProdutos };
