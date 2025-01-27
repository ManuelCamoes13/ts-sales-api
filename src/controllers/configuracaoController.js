const configuracaoService = require('../services/configuracaoService');

// Função para criar uma nova configuração
const criarConfiguracao = async (req, res) => {
    const { nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola } = req.body;

    try {
        const configuracao = await configuracaoService.criarConfiguracao(
            nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola
        );
        res.status(201).json({ message: 'Configuração criada com sucesso', configuracao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar configuração', error: error.message });
    }
};

// Função para listar todas as configurações
const listarConfiguracoes = async (req, res) => {
    try {
        const configuracoes = await configuracaoService.listarConfiguracoes();
        res.status(200).json(configuracoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Função para obter uma configuração específica
const obterConfiguracao = async (req, res) => {
    const { id } = req.params;

    try {
        const configuracao = await configuracaoService.obterConfiguracao(id);
        res.status(200).json(configuracao);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Função para atualizar uma configuração existente
const atualizarConfiguracao = async (req, res) => {
    const { id } = req.params;
    const { nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola } = req.body;

    try {
        const configuracaoAtualizada = await configuracaoService.atualizarConfiguracao(
            id, nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola
        );
        res.status(200).json({ message: 'Configuração atualizada com sucesso', configuracaoAtualizada });
    } catch (error) {
        if (error.message === 'Configuração não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar configuração', error: error.message });
        }
    }
};

// Função para deletar uma configuração
const deletarConfiguracao = async (req, res) => {
    const { id } = req.params;

    try {
        await configuracaoService.deletarConfiguracao(id);
        res.status(200).json({ message: 'Configuração deletada com sucesso' });
    } catch (error) {
        if (error.message === 'Configuração não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao deletar configuração', error: error.message });
        }
    }
};

module.exports = {
    criarConfiguracao,
    listarConfiguracoes,
    obterConfiguracao,
    atualizarConfiguracao,
    deletarConfiguracao
};
