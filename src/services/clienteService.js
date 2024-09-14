// services/clienteService.js
const Cliente = require('../models/Cliente');

const criarCliente = async (nome, nuit, email, contacto, endereco) => {
    return await Cliente.create({ nome, nuit, email, contacto, endereco });
};

const listarClientes = async () => {
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        throw new Error('Erro ao listar clientes: ' + error.message);
    }
};

const atualizarCliente = async (id, nome, nuit, email, contacto, endereco) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    cliente.nome = nome;
    cliente.nuit = nuit;
    cliente.email = email;
    cliente.contacto = contacto;
    cliente.endereco = endereco;
    await cliente.save();
    return cliente;
};

const deletarCliente = async (id) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    await cliente.destroy();
};

module.exports = { criarCliente,listarClientes, atualizarCliente, deletarCliente };
