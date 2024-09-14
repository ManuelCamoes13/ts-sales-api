// controllers/vendaController.js
const vendaService = require('../services/vendaService');

const realizarVenda = async (req, res) => {
    const { produtoId, clienteId, quantidade, custoMaoObra, imposto } = req.body;

    try {
        const venda = await vendaService.realizarVenda(produtoId, clienteId, quantidade, custoMaoObra, imposto);
        res.status(200).json({ message: 'Venda realizada e estoque atualizado', venda });
    } catch (error) {
        if (error.message === 'Produto não encontrado') {
            res.status(404).send(error.message);
        } else if (error.message === 'Estoque insuficiente') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send('Erro ao realizar venda');
        }
    }
};

module.exports = { realizarVenda };
