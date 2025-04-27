// services/facturaService.js
const Cotacao = require('../models/Cotacao');
const Venda = require('../models/Venda');
const Cliente = require('../models/Cliente');

const criarCotacoes = async (vendaId, data) => {
    return await Cotacao.create({ vendaId, data });
};

const atualizarCotacao = async (id, data) => {
    const cotacao = await Cotacao.findByPk(id);
    if (!cotacao) throw new Error('Factura não encontrada');
    cotacao.data = data;
    await factura.save();
    return cotacao;
};

const deletarCotacao = async (id) => {
    const cotacao = await Cotacao.findByPk(id);
    if (!cotacao) throw new Error('Factura não encontrada');
    await cotacao.destroy();
};

const listarCotacoes = async () => {
    return await Cotacao.findAll({
      // include: [
      //   {
      //     model: Venda,
      //     as: 'venda',
      //     include: [
      //       {
      //         model: Cliente,
      //         as: 'cliente',
      //       },
      //     ],
      //   },
      // ],
    });
  };
  

module.exports = { criarCotacoes, atualizarCotacao, deletarCotacao, listarCotacoes };
