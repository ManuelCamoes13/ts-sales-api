const express = require('express');
const vendaController = require('../controllers/vendaController');
const router = express.Router();

// Realizar uma venda
router.post('/', vendaController.realizarVenda);

// Outras rotas específicas para vendas podem ser adicionadas aqui no futuro

module.exports = router;
