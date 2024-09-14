const produtoService = require('../services/produtoService');

// Adicionar produto
const adicionarProduto = (req, res) => {
    const { nome, quantidade, preco } = req.body;
    if (!nome || quantidade === undefined || preco === undefined) {
        return res.status(400).send('Nome, quantidade e preço são necessários');
    }

    produtoService.adicionarProduto({ nome, quantidade, preco })
        .then(() => res.status(201).send('Produto adicionado com sucesso'))
        .catch(err => res.status(500).send(err.message));
};

// Atualizar produto
const atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, preco } = req.body;

    produtoService.atualizarProduto(id, { nome, quantidade, preco })
        .then(() => res.status(200).send('Produto atualizado com sucesso'))
        .catch(err => res.status(500).send(err.message));
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
