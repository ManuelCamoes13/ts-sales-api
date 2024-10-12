// services/vendaService.js
const Venda = require('../models/Venda');
const Produto = require('../models/Produto'); // Certifique-se de ter o modelo Produto configurado
const VendaProduto = require('../models/VendaPorduto'); // Novo modelo
const VendaMaoDeObra = require('../models/VendaMaoDeObra'); // Novo modelo
const MaoDeObra = require('../models/MaoDeObra')


const realizarVenda = async (user_id, cliente_id, produtos, mao_de_obras, imposto, desconto) => {
    // Iniciar a transação
    const transaction = await Venda.sequelize.transaction();

    try {
        // Criar a venda
        const novaVenda = await Venda.create({
            user_id,
            cliente_id,
            imposto,
            desconto,
        }, { transaction });

        // Registrar os produtos vendidos
        for (const item of produtos) {
            const produto = await Produto.findByPk(item.produto_id, { transaction });
            if (!produto) throw new Error('Produto não encontrado');
            if (produto.quantidade < item.quantidade) throw new Error('Estoque insuficiente');

            // Criar o registro na tabela intermediária VendaProduto
            await VendaProduto.create({
                venda_id: novaVenda.id,
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                preco_unitario:item.preco_unitario
            }, { transaction });

            // Atualizar o estoque do produto
            produto.quantidade -= item.quantidade;
            await produto.save({ transaction });
        }

        // Registrar as mãos-de-obra
        for (const maoDeObra of mao_de_obras) {
            await VendaMaoDeObra.create({
                venda_id: novaVenda.id,
                mao_de_obra_id: maoDeObra.mao_de_obra_id,
                preco: maoDeObra.preco,
            }, { transaction });
        }

        // Comitar a transação
        await transaction.commit();
        return novaVenda;
    } catch (error) {
        // Reverter a transação em caso de erro
        await transaction.rollback();
        throw error;
    }
};



const User = require('../models/User');
const Cliente = require('../models/Cliente');

const getAllVendasWithDetails = async () => {
    try {
        const vendas = await Venda.findAll({
            include: [
                {
                    model: User,
                    as: 'user', // Certifique-se de definir as associações corretamente
                    attributes: ['id', 'name'], // Colunas que você quer trazer do User
                },
                {
                    model: MaoDeObra,
                    as: 'mao_de_obra',
                    attributes: ['id', 'nome', 'preco'], // Colunas que você quer trazer do Produto
                },
                {
                    model: Produto,
                    as: 'produto',
                    attributes: ['id', 'nome', 'preco'], // Colunas que você quer trazer do Produto
                },
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['id', 'nome', 'email'], // Colunas que você quer trazer do Cliente
                },
            
            ]
        });
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar as vendas:', error);
        throw error;
    }
};
module.exports = { realizarVenda, getAllVendasWithDetails };
