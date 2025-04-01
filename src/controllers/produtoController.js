const produtoService = require('../services/produtoService');

// Adicionar produto
const adicionarProduto = (req, res) => {
    console.log(req.body)
    const { nome, descricao, quantidade, preco, notas, quantidadeMinima, tipo, unidade, imagem, categoria_id } = req.body;
    if (!nome || quantidade === undefined || preco === undefined || !categoria_id) {
        return res.status(400).send('Nome, quantidade, preço e categoria são necessários');
    }

    produtoService.adicionarProduto({ nome, descricao, quantidade, preco, notas, quantidadeMinima,tipo, unidade, imagem, categoria_id })
        .then(() => res.status(201).send('Produto adicionado com sucesso'))
        .catch(err => {
            console.error("Erro ao adicionar produto:", err);  // Imprime o erro completo no servidor
            res.status(500).send(err.message);  // Envia apenas a mensagem do erro para o cliente
        });
};

// Atualizar produto
const atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome,descricao, quantidade, preco, notas, quantidadeMinima,tipo, unidade, imagem, categoria_id } = req.body;

    produtoService.atualizarProduto(id, { nome, descricao, quantidade, preco, notas, quantidadeMinima,tipo, unidade, imagem, categoria_id })
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
