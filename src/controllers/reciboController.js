const reciboService = require('../services/reciboService');

const listRecibos = async (req, res) => {
  try {
    // Chama o serviço para listar os recibos
    const recibos = await reciboService.listRecibos();
    res.status(200).json(recibos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createRecibo = async (req, res) => {
  console.log(req.body.facturas)
  try {
    const  facturas  = req.body.facturas;
    const  formaPagamento = req.body.formaPagamento;
    const  estado  = req.body.estado;
    const  numeroCheque  = req.body.numeroCheque;
    

    // Validação do corpo da requisição
    if (!Array.isArray(facturas) || facturas.length === 0) {
      return res.status(400).json({ error: "O campo 'facturas' é obrigatório e deve ser um array." });
    }

    if (!formaPagamento || !estado) {
      return res.status(400).json({ error: "'formaPagamento' e 'estado' são obrigatórios." });
    }

    // Chama o serviço para criar o recibo
    const recibo = await reciboService.createRecibo( req, res );

    res.status(201).json(recibo);
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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    await reciboService.deleteRecibo(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    const recibo = await reciboService.getRecibo(id);

    if (!recibo) {
      return res.status(404).json({ message: 'Recibo não encontrado' });
    }

    res.status(200).json(recibo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getRecibo,
  listRecibos,
  createRecibo,
  updateRecibo,
  deleteRecibo,
};
