// routes/categoriaRoutes.js
const express = require('express');
const maoDeObraController = require('../controllers/maoDeObraController');
// const auth = require('../middlewares/auth'); // Se você usar autenticação
const router = express.Router();

// Criar uma nova mao de obra
router.post('/',  maoDeObraController.criarMaoDeObra);

router.get('/',  maoDeObraController.listarMaoDeobra);
// Atualizar uma mao de obra existente
router.put('/:id',  maoDeObraController.atualizarMaoDeObra);


// Deletar uma mao de obra
router.delete('/:id',  maoDeObraController.deletarMaoDeObra);

module.exports = router;
