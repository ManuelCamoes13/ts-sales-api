// controllers/facturaController.js
const facturaService = require('../services/facturaService');

const criarFactura = async (req, res) => {
    const { vendaId, data } = req.body;

    try {
        const factura = await facturaService.criarFactura(vendaId, data);
        res.status(201).json({ message: 'Factura criada com sucesso', factura });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar factura', error: error.message });
    }
};

const atualizarFactura = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const factura = await facturaService.atualizarFactura(id, data);
        res.status(200).json({ message: 'Factura atualizada com sucesso', factura });
    } catch (error) {
        if (error.message === 'Factura não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar factura', error: error.message });
        }
    }
};

const deletarFactura = async (req, res) => {
    const { id } = req.params;

    try {
        await facturaService.deletarFactura(id);
        res.status(200).json({ message: 'Factura deletada com sucesso' });
    } catch (error) {
        if (error.message === 'Factura não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao deletar factura', error: error.message });
        }
    }
};

module.exports = { criarFactura, atualizarFactura, deletarFactura };
