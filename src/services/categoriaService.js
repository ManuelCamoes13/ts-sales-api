// services/categoriaService.js
const Categoria = require('../models/Categoria');

const criarCategoria = async (nome) => {
    return await Categoria.create({ nome });
};
const listarCategorias = async () => {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
    } catch (error) {
        throw new Error('Erro ao listar categorias: ' + error.message);
    }
};
const atualizarCategoria = async (id, nome) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoria não encontrada');
    categoria.nome = nome;
    await categoria.save();
    return categoria;
};

const deletarCategoria = async (id) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoria não encontrada');
    await categoria.destroy();
};

module.exports = { criarCategoria, listarCategorias, atualizarCategoria, deletarCategoria };
