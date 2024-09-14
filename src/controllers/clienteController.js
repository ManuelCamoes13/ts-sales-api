// controllers/clienteController.js
const clienteService = require('../services/clienteService');

const criarCliente = async (req, res) => {
    const { nome, nuit, email, contacto, endereco } = req.body;

    try {
        const cliente = await clienteService.criarCliente(nome, nuit, email, contacto, endereco);
        res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
};

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, nuit, email, contacto, endereco } = req.body;

    try {
        const cliente = await clienteService.atualizarCliente(id, nome, nuit, email, contacto, endereco);
        res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
    } catch (error) {
        if (error.message === 'Cliente não encontrado') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
        }
    }
};

const deletarCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await clienteService.deletarCliente(id);
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        if (error.message === 'Cliente não encontrado') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
        }
    }
};

module.exports = { criarCliente, atualizarCliente, deletarCliente };
