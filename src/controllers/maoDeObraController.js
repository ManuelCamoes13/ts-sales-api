// controllers/maoDeObraController.js
const maoDeobraService = require('../services/maoDeobraService');

const criarMaoDeObra = async (req, res) => {
    const { nome } = req.body;
    const { preco, categoria_id} = req.body;
    try {
        const maoDeobra = await maoDeobraService.criarMaoDeObra(nome, preco, categoria_id);
        res.status(201).json({ message: 'Mao-de-obra criada com sucesso', maoDeobra });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar Mao-de-obra', error: error.message });
    }
};

const listarMaoDeobra = async (req, res) => {
    try {
        const maoDeobra = await maoDeobraService.listarMaoDeobra();
        res.status(200).json(maoDeobra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const atualizarMaoDeObra = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { preco, categoria_id } = req.body;

    try {
        const maoDeobra = await maoDeobraService.atualizarMaoDeObra(id, nome, preco, categoria_id);
        res.status(200).json({ message: 'Mao-de-obra atualizada com sucesso', maoDeobra });
    } catch (error) {
        if (error.message === 'Mao de obra não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar mao de obra', error: error.message });
        }
    }
};

const deletarMaoDeObra = async (req, res) => {
    const { id } = req.params;

    try {
        await maoDeobraService.deletarMaoDeObra(id);
        res.status(200).json({ message: 'Mao de bra deletada com sucesso' });
    } catch (error) {
        if (error.message === 'Mao de obra não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao deletar mao de obra', error: error.message });
        }
    }
};

module.exports = { criarMaoDeObra, listarMaoDeobra, atualizarMaoDeObra, deletarMaoDeObra };
