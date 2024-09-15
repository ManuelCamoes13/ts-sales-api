// services/categoriaService.js
const MaoDeObra = require('../models/MaoDeObra');

const criarMaoDeObra = async (nome, preco) => {
    return await MaoDeObra.create({ nome, preco });
};
const listarMaoDeobra = async () => {
    try {
        const maoDeObra = await MaoDeObra.findAll();
        return maoDeObra;
    } catch (error) {
        throw new Error('Erro ao listar Maos de obra: ' + error.message);
    }
};
const atualizarMaoDeObra = async (id, nome, preco) => {
    const maoDeobra = await MaoDeObra.findByPk(id);
    if (!maoDeobra) throw new Error('Mao de obra não encontrada');
    maoDeobra.nome = nome;
    maoDeobra.preco = preco;
    await maoDeobra.save();
    return maoDeobra;
};

const deletarMaoDeObra = async (id) => {
    const maoDeobra = await MaoDeObra.findByPk(id);
    if (!categoria) throw new Error('Mao de obra não encontrada');
    await categoria.destroy();
};

module.exports = { criarMaoDeObra, listarMaoDeobra, atualizarMaoDeObra, deletarMaoDeObra };
