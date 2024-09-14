// services/categoriaService.js
const Categoria = require('../models/Categoria');

const criarCategoria = async (nome) => {
    return await Categoria.create({ nome });
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

module.exports = { criarCategoria, atualizarCategoria, deletarCategoria };
