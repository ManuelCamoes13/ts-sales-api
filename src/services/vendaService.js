// services/vendaService.js
const Venda = require('../models/Venda');
const Produto = require('../models/Produto'); // Certifique-se de ter o modelo Produto configurado
const VendaProduto = require('../models/VendaPorduto'); // Novo modelo
const VendaMaoDeObra = require('../models/VendaMaoDeObra'); // Novo modelo
const MaoDeObra = require('../models/MaoDeObra')
const Factura = require('../models/Factura');
const User = require('../models/User');
const Cliente = require('../models/Cliente');
const { Op } = require('sequelize');

// Função para gerar o código da fatura
const gerarCodigoFactura = async () => {
    const anoAtual = new Date().getFullYear().toString().slice(-2); // Pega os últimos dois dígitos do ano atual (ex: '24')
    
    // Buscar a última fatura gerada
    const ultimaFactura = await Factura.findOne({
        order: [['createdAt', 'DESC']],
    });

    let numeroSequencial = '0001'; // Caso não haja nenhuma fatura no sistema
    if (ultimaFactura) {
        // Extrair o número sequencial e incrementar
        const ultimoCodigo = ultimaFactura.codigoFactura;
        const ultimoNumero = parseInt(ultimoCodigo.split('-')[1].split('/')[0], 10);
        numeroSequencial = String(ultimoNumero + 1).padStart(4, '0'); // Incrementa e preenche com zeros à esquerda
    }

    // Retorna o código da fatura no formato FACT-0001/24
    return `FACT-${numeroSequencial}/${anoAtual}`;
};


const realizarVenda = async (user_id, cliente_id, produtos, mao_de_obras, imposto, desconto, pagamentoAVista = false) => {
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

            await VendaProduto.create({
                venda_id: novaVenda.id,
                produto_id: item.produto_id,
                nome: item.nome,
                quantidade: item.quantidade,
                preco_unitario: item.preco,
            }, { transaction });

            produto.quantidade -= item.quantidade;
            await produto.save({ transaction });
        }

        // Registrar as mãos-de-obra
        for (const maoDeObra of mao_de_obras) {
            await VendaMaoDeObra.create({
                venda_id: novaVenda.id,
                mao_de_obra_id: maoDeObra.mao_de_obra_id,
                nome: maoDeObra.nome,
                preco: maoDeObra.preco,
            }, { transaction });
        }

        // Gerar o código da fatura
        const codigoFactura = await gerarCodigoFactura();

        // Definir estado e data de pagamento com base no pagamento à vista
        let estado = 'pendente';
        let dataPagamento = null;

        if (pagamentoAVista) {
            estado = 'pago';
            dataPagamento = new Date();
        }

        // Criar a fatura vinculada à venda
        await Factura.create({
            venda_id: novaVenda.id,
            codigoFactura,
            data: new Date(),
            estado,
            dataPagamento,
        }, { transaction });

        // Comitar a transação
        await transaction.commit();
        return novaVenda;
    } catch (error) {
        // Reverter a transação em caso de erro
        await transaction.rollback();
        throw error;
    }
};





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
