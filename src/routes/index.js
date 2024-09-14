const express = require('express');
const userRoutes = require('./userRoutes');
const produtoRoutes = require('./produtoRoutes');
const vendaRoutes = require ('./vendaRoutes');
const categoriaRoutes = require ('./categoriaRoutes');
const clienteRoutes = require ('./clienteRoutes');
const facturaRoutes = require ('./facturaRoutes');
const {verificarToken}  = require('../middlewares/auth'); // Importe o middleware de autenticação

const router = express.Router();

// Rota pública
router.get('/', (req, res) => {
    res.send('API is on');
});

// Rotas protegidas usando verificarToken
router.use('/users', userRoutes);
// Rotas protegidas usando verificarToken
router.use('/produtos', verificarToken, produtoRoutes); // Protege todas as rotas de produtos
router.use('/venda', verificarToken, vendaRoutes); 
router.use('/categorias',verificarToken, categoriaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/facturas', facturaRoutes);
// Caso queira proteger rotas específicas dentro de um grupo de rotas, faça assim:

module.exports = router;
