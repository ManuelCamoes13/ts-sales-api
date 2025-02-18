const express = require('express');
const userController = require('../controllers/userController');
const {verificarToken} = require('../middlewares/auth');
const router = express.Router();

router.post('/registar', userController.registrarUtilizador);
router.post('/login', userController.loginUtilizador);
router.get('/', userController.listarUsers);

module.exports = router;
