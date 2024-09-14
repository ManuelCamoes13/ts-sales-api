// routes/facturaRoutes.js
const express = require('express');
const facturaController = require('../controllers/facturaController');
const auth = require('../middlewares/auth'); // Se você usar autenticação
const router = express.Router();

// Criar uma nova factura
router.post('/', facturaController.criarFactura);

// Atualizar uma factura existente
router.put('/:id', facturaController.atualizarFactura);

// Deletar uma factura
router.delete('/:id', facturaController.deletarFactura);

module.exports = router;
