const express = require('express');
const configuracaoController = require('../controllers/configuracaoController');
// const auth = require('../middlewares/auth'); // Se você usar autenticação
const router = express.Router();

// Criar uma nova configuração
router.post('/', configuracaoController.criarConfiguracao);

// Listar todas as configurações
router.get('/', configuracaoController.listarConfiguracoes);

// Obter uma configuração específica pelo ID
router.get('/:id', configuracaoController.obterConfiguracao);

// Atualizar uma configuração existente
router.put('/:id', configuracaoController.atualizarConfiguracao);

// Deletar uma configuração
router.delete('/:id', configuracaoController.deletarConfiguracao);

module.exports = router;
