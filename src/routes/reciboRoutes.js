const express = require('express');
const reciboController = require('../controllers/reciboController');
const {verificarToken} = require('../middlewares/auth');
const router = express.Router();

// Rota para criar um recibo
router.post('/', reciboController.createRecibo);
router.get('/', reciboController.listRecibos);

router.get('/:id', reciboController.getRecibo);



// Rota para atualizar um recibo existente
router.put('/:id', reciboController.updateRecibo);

// Rota para deletar um recibo
router.delete('/:id', reciboController.deleteRecibo);
module.exports = router;
