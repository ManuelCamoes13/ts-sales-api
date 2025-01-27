const Configuracao = require('../models/Configuracao');

// Função para criar uma nova configuração
const criarConfiguracao = async (nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola) => {
    // Verifica se já existe uma configuração (baseado em algum critério, por exemplo, email ou nome_empresa)
    const configuracaoExistente = await Configuracao.findOne({ where: { nome_empresa } });

    if (configuracaoExistente) {
        // Se já existir uma configuração com o nome da empresa, retorna uma mensagem ou lança um erro
        throw new Error('Configuração com esse nome de empresa já existe');
    }

    // Se não existir, cria a nova configuração
    return await Configuracao.create({
        nome_empresa,
        nuit,
        email,
        site,
        telefone1,
        telefone2,
        endereco,
        bci,
        bim,
        mpesa,
        emola
    });
};

// Função para obter uma configuração pelo ID
const obterConfiguracao = async (id) => {
    const configuracao = await Configuracao.findByPk(id);
    if (!configuracao) {
        throw new Error('Configuração não encontrada');
    }
    return configuracao;
};

// Função para listar todas as configurações
const listarConfiguracoes = async () => {
    try {
        const configuracoes = await Configuracao.findAll();
        return configuracoes;
    } catch (error) {
        throw new Error('Erro ao listar configurações: ' + error.message);
    }
};

// Função para atualizar uma configuração
const atualizarConfiguracao = async (id, nome_empresa, nuit, email, site, telefone1, telefone2, endereco, bci, bim, mpesa, emola) => {
    const configuracao = await Configuracao.findByPk(id);
    if (!configuracao) throw new Error('Configuração não encontrada');

    // Atualiza os valores da configuração
    configuracao.nome_empresa = nome_empresa || configuracao.nome_empresa;
    configuracao.nuit = nuit || configuracao.nuit;
    configuracao.email = email || configuracao.email;
    configuracao.site = site || configuracao.site;
    configuracao.telefone1 = telefone1 || configuracao.telefone1;
    configuracao.telefone2 = telefone2 || configuracao.telefone2;
    configuracao.endereco = endereco || configuracao.endereco;
    configuracao.bci = bci || configuracao.bci;
    configuracao.bim = bim || configuracao.bim;
    configuracao.mpesa = mpesa || configuracao.mpesa;
    configuracao.emola = emola || configuracao.emola;

    // Salva as alterações
    await configuracao.save();
    return configuracao;
};

// Função para deletar uma configuração
const deletarConfiguracao = async (id) => {
    const configuracao = await Configuracao.findByPk(id);
    if (!configuracao) throw new Error('Configuração não encontrada');
    
    // Deleta a configuração
    await configuracao.destroy();
};

module.exports = {
    criarConfiguracao,
    listarConfiguracoes,
    obterConfiguracao,
    atualizarConfiguracao,
    deletarConfiguracao
};
