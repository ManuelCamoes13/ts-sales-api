// services/facturaService.js
const Factura = require('../models/Factura');
const Venda = require('../models/Venda');
const Cliente = require('../models/Cliente');

const criarFactura = async (vendaId, data) => {
    return await Factura.create({ vendaId, data });
};

const atualizarFactura = async (id, data) => {
    const factura = await Factura.findByPk(id);
    if (!factura) throw new Error('Factura não encontrada');
    factura.data = data;
    await factura.save();
    return factura;
};

const deletarFactura = async (id) => {
    const factura = await Factura.findByPk(id);
    if (!factura) throw new Error('Factura não encontrada');
    await factura.destroy();
};

const listarFacturas = async () => {
    return await Factura.findAll({
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
  

module.exports = { criarFactura, atualizarFactura, deletarFactura, listarFacturas };
