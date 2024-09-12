const express = require('express');
const userRoutes = require('./userRoutes');
const produtoRoutes = require('./produtoRoutes');
const {verificarToken}  = require('../middlewares/auth'); // Importe o middleware de autenticação

const router = express.Router();

// Rota pública
router.get('/', (req, res) => {
    res.send('API is on');
});

// Rotas protegidas usando verificarToken
router.use('/users', userRoutes); // Protege todas as rotas de usuários
router.use('/produtos', verificarToken, produtoRoutes); // Protege todas as rotas de produtos

// Caso queira proteger rotas específicas dentro de um grupo de rotas, faça assim:
// router.use('/vendas', verificarToken, saleRoutes);

module.exports = router;
