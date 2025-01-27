// services/categoriaService.js
const Categoria = require('../models/CategoriaMaoDeObra');

const criarCategoria = async (nome,unidade,estado) => {
    // Verifica se já existe uma categoria com o mesmo nome
    const categoriaExistente = await Categoria.findOne({ where: { nome } });
    if (categoriaExistente) {
        // Se a categoria já existir, retorna uma mensagem ou lança um erro
        throw new Error('Categoria com esse nome já existe');
    }

    // Se não existir, cria a nova categoria
    return await Categoria.create({ nome,unidade,estado });
};

const obterCategoria = async (id) => {
    console.log(id)
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
        throw new Error('Categoria não encontrado');
    }
    return categoria;
};
const listarCategorias = async () => {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
    } catch (error) {
        throw new Error('Erro ao listar categorias: ' + error.message);
    }
};
const atualizarCategoria = async (id, nome, unidade) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoria não encontrada');
    categoria.nome = nome;
    categoria.unidade = unidade;
    categoria.estado = estado;
    await categoria.save();
    return categoria;
};

const deletarCategoria = async (id) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoria não encontrada');
    await categoria.destroy();
};

module.exports = { criarCategoria, listarCategorias, atualizarCategoria, deletarCategoria, obterCategoria };
