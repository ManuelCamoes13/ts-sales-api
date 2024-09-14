// routes/categoriaRoutes.js
const express = require('express');
const categoriaController = require('../controllers/categoriaController');
// const auth = require('../middlewares/auth'); // Se você usar autenticação
const router = express.Router();

// Criar uma nova categoria
router.post('/',  categoriaController.criarCategoria);

router.get('/',  categoriaController.listarCategorias);
// Atualizar uma categoria existente
router.put('/:id',  categoriaController.atualizarCategoria);


// Deletar uma categoria
router.delete('/:id',  categoriaController.deletarCategoria);

module.exports = router;
