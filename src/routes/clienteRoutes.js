// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/clienteController');
const auth = require('../middlewares/auth'); // Se você usar autenticação
const router = express.Router();

// Criar um novo cliente
router.post('/', clienteController.criarCliente);

router.get('/', clienteController.listarClientes);

// Atualizar um cliente existente
router.put('/:id', clienteController.atualizarCliente);

// Deletar um cliente
router.delete('/:id', clienteController.deletarCliente);


module.exports = router;
