const produtoService = require('../services/produtoService');

// Adicionar produto
const adicionarProduto = async ({ nome, quantidade, preco, notas, quantidade_de_stock_baixo, imagem, categoriaId }) => {
    if (!nome || quantidade === undefined || preco === undefined || !categoriaId) {
        throw new Error('Nome, quantidade, preço e categoria são necessários');
    }
    return await Produto.create({ nome, quantidade, preco, notas, quantidade_de_stock_baixo, imagem, categoriaId });
};

// Atualizar produto
const atualizarProduto = async (id, { nome, quantidade, preco, notas, quantidade_de_stock_baixo, imagem, categoriaId }) => {
    const produto = await Produto.findByPk(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    return await produto.update({ nome, quantidade, preco, notas, quantidade_de_stock_baixo, imagem, categoriaId });
};

// Deletar produto
const deletarProduto = (req, res) => {
    const { id } = req.params;

    produtoService.deletarProduto(id)
        .then(() => res.status(200).send('Produto deletado com sucesso'))
        .catch(err => res.status(500).send(err.message));
};

// Obter um produto
const obterProduto = (req, res) => {
    const { id } = req.params;

    produtoService.obterProduto(id)
        .then(produto => res.status(200).json(produto))
        .catch(err => res.status(500).send(err.message));
};

// Listar produtos
const listarProdutos = (req, res) => {
    produtoService.listarProdutos()
        .then(produtos => res.status(200).json(produtos))
        .catch(err => res.status(500).send(err.message));
};

module.exports = { adicionarProduto, atualizarProduto, deletarProduto, obterProduto, listarProdutos };
