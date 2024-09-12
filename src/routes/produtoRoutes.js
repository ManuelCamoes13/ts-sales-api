const express = require('express');
const produtoController = require('../controllers/produtoController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', produtoController.adicionarProduto);
router.get('/', produtoController.listarProdutos);

module.exports = router;
