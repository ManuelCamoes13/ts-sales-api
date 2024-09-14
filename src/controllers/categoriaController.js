// controllers/categoriaController.js
const categoriaService = require('../services/categoriaService');

const criarCategoria = async (req, res) => {
    const { nome } = req.body;

    try {
        const categoria = await categoriaService.criarCategoria(nome);
        res.status(201).json({ message: 'Categoria criada com sucesso', categoria });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
    }
};

const listarCategorias = async (req, res) => {
    try {
        const categorias = await categoriaService.listarCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const atualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
        const categoria = await categoriaService.atualizarCategoria(id, nome);
        res.status(200).json({ message: 'Categoria atualizada com sucesso', categoria });
    } catch (error) {
        if (error.message === 'Categoria não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
        }
    }
};

const deletarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        await categoriaService.deletarCategoria(id);
        res.status(200).json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
        if (error.message === 'Categoria não encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
        }
    }
};

module.exports = { criarCategoria,listarCategorias, atualizarCategoria, deletarCategoria };
