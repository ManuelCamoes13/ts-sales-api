// services/categoriaService.js
const MaoDeObra = require('../models/MaoDeObra');
const CategoriaMaoDeObra = require('../models/CategoriaMaoDeObra');

const criarMaoDeObra = async (nome, preco, categoria_id) => {
    return await MaoDeObra.create({ nome, preco, categoria_id });
};
const listarMaoDeobra = async () => {
    try {
        const maoDeObras = await MaoDeObra.findAll({
            include: {
                model: CategoriaMaoDeObra,
                as: 'categoria', // Alias usado na associação
                attributes: ['id', 'nome'], // Inclui apenas 'id' e 'nome' da CategoriaMaoDeObra
            },
        });
        return maoDeObras;
    } catch (error) {
        throw new Error('Erro ao listar mão de obra: ' + error.message);
    }
};
const atualizarMaoDeObra = async (id, nome, preco, categoria_id) => {
    const maoDeobra = await MaoDeObra.findByPk(id);
    if (!maoDeobra) throw new Error('Mao de obra não encontrada');
    maoDeobra.nome = nome;
    maoDeobra.preco = preco;
    maoDeobra.categoria_id= categoria_id
    await maoDeobra.save();
    return maoDeobra;
};

const deletarMaoDeObra = async (id) => {
    const maoDeobra = await MaoDeObra.findByPk(id);
    if (!categoria) throw new Error('Mao de obra não encontrada');
    await categoria.destroy();
};

module.exports = { criarMaoDeObra, listarMaoDeobra, atualizarMaoDeObra, deletarMaoDeObra };
