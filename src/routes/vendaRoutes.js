const express = require('express');
const vendaController = require('../controllers/vendaController');
const router = express.Router();

// Realizar uma venda
router.post('/', vendaController.realizarVenda);

// Obter todas as vendas
router.get('/', vendaController.getAllVendas);

// Obter detalhes de uma venda específica
router.get('/:id', vendaController.getVendaById);

router.delete('/:vendaId', vendaController.cancelarVenda);

module.exports = router;
