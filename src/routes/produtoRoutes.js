const express = require('express');
const produtoController = require('../controllers/produtoController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Adicionar produto
router.post('/', produtoController.adicionarProduto);

// Listar todos os produtos
router.get('/', produtoController.listarProdutos);

// Obter um produto específico (find 1)
router.get('/:id', produtoController.obterProduto);

// Atualizar um produto específico
router.put('/:id', produtoController.atualizarProduto);

// Deletar um produto específico
router.delete('/:id', produtoController.deletarProduto);

module.exports = router;

