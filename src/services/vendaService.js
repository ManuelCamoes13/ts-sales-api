// services/vendaService.js
const Venda = require('../models/Venda');
const Produto = require('../models/Produto'); // Certifique-se de ter o modelo Produto configurado

const realizarVenda = async (produtoId, clienteId, quantidade, custoMaoObra, imposto) => {
    // Verificar se o produto tem estoque suficiente
    const produto = await Produto.findByPk(produtoId);
    if (!produto) throw new Error('Produto não encontrado');
    if (produto.quantidade < quantidade) throw new Error('Estoque insuficiente');

    // Registrar a venda
    const novaVenda = await Venda.create({
        produtoId,
        clienteId,
        quantidade,
        custoMaoObra,
        imposto,
    });

    // Atualizar o estoque do produto
    produto.quantidade -= quantidade;
    await produto.save();

    return novaVenda;
};

module.exports = { realizarVenda };
