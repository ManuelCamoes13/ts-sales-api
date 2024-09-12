const produtoService = require('../services/produtoService');

const adicionarProduto = (req, res) => {
    console.log('Dados recebidos para adicionar produto:', req.body);

    const { nome, quantidade, preco } = req.body;
    if (!nome || quantidade === undefined || preco === undefined) {
        return res.status(400).send('Nome, quantidade e preço são necessários');
    }

    produtoService.adicionarProduto({ nome, quantidade, preco })
        .then(() => res.status(201).send('Produto adicionado com sucesso'))
        .catch(err => res.status(500).send(err.message));
};

const listarProdutos = (req, res) => {
    produtoService.listarProdutos()
        .then(produtos => res.status(200).json(produtos))
        .catch(err => res.status(500).send(err.message));
};

module.exports = { adicionarProduto, listarProdutos };
