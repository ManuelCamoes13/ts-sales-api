// Controller: reciboController.js

const Factura = require('../models/Factura');
const Recibo = require('../models/Recibo');


const createRecibo = async (req, res) => {
  try {
    
    const  facturas  = req.body.facturas;
    const  formaPagamento = req.body.formaPagamento;
    const  estado  = req.body.estado;
    const  numeroCheque  = req.body.numeroCheque;

    // Geração do código do recibo no formato REC-0001/24
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await Recibo.count();
    const codigo = `REC-${String(count + 1).padStart(4, '0')}/${year}`;

    // Cria o recibo
    const recibo = await Recibo.create({
      codigo,
      formaPagamento,
      estado,
      numeroCheque,
    });

    // Associa as faturas ao recibo e atualiza os estados
    if (facturas && facturas.length > 0) {
      await Promise.all(
        facturas.map(async (facturaId) => {
          const factura = await Factura.findByPk(facturaId);

          if (factura) {
            await factura.update({
              recibo_id: recibo.id,
              estado: 'pago',
              numeroCheque: recibo.numeroCheque,
              dataPagamento: new Date(),
            });
          }
        })
      );
    }

    // Busca o recibo atualizado com as faturas associadas
    const reciboCompleto = await Recibo.findByPk(recibo.id, {
      include: { model: Factura},
    });

    res.status(201).json(reciboCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    const recibo = await reciboService.updateRecibo(id, req.body);
    res.status(200).json(recibo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    await reciboService.deleteRecibo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listRecibos = async () => {
  try {
    const recibos = await Recibo.findAll({
      attributes: ['id', 'codigo', 'formaPagamento','numeroCheque', 'estado', 'createdAt', 'updatedAt'], // Inclua os campos necessários
    });
    return recibos;
  } catch (error) {
    throw new Error('Erro ao listar recibos: ' + error.message);
  }
};


const getRecibo = async (id) => {
  return await Recibo.findByPk(id, {
    attributes: ['id', 'codigo', 'formaPagamento', 'numeroCheque', 'estado', 'createdAt','updatedAt'], // Adicione o createdAt explicitamente
    include: {
      model: Factura,
      attributes: ['id', 'codigoFactura', 'estado', 'createdAt','updatedAt'], // Adicione o createdAt do modelo Factura
    },
  });
};


module.exports = {
  getRecibo,
  listRecibos,
  createRecibo,
  updateRecibo,
  deleteRecibo,
};
