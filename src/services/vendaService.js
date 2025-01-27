// services/vendaService.js
const Venda = require('../models/Venda');
const Produto = require('../models/Produto'); // Certifique-se de ter o modelo Produto configurado
const VendaProduto = require('../models/VendaProduto'); // Novo modelo
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
                quantidade:maoDeObra.quantidade,
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

const cancelarVenda = async (vendaId) => {
    const transaction = await Venda.sequelize.transaction();

    try {
        // Localizar a venda
        const venda = await Venda.findByPk(vendaId, {
            include: [
                {
                    model: VendaProduto,
                    as: 'vendaProdutos',
                },
                {
                    model: VendaMaoDeObra,
                    as: 'vendaMaoDeObras',
                },
                {
                    model: Factura,
                    as: 'factura',
                },
            ],
            transaction,
        });

        if (!venda) {
            throw new Error('Venda não encontrada');
        }

        // Verificar se a fatura já está cancelada
        if (venda.factura.estado === 'cancelado') {
            throw new Error('Venda já está cancelada');
        }

        // Retornar o estoque dos produtos
        for (const item of venda.vendaProdutos) {
            const produto = await Produto.findByPk(item.produto_id, { transaction });

            if (!produto) {
                throw new Error(`Produto com ID ${item.produto_id} não encontrado`);
            }

            // Repor a quantidade no estoque
            produto.quantidade += item.quantidade;
            await produto.save({ transaction });
        }

        // Atualizar o estado da fatura para "cancelado"
        venda.factura.estado = 'cancelado';
        await venda.factura.save({ transaction });

        // Comitar a transação
        await transaction.commit();
        return { message: 'Venda cancelada com sucesso' };
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
                    as: 'user',
                    attributes: ['id', 'name'],
                },
                {
                    model: Produto,
                    as: 'produtos',
                    attributes: ['id', 'nome', 'preco','descricao','unidade'],
                    through: { attributes: ['quantidade'] },
                },
                {
                    model: MaoDeObra,
                    as: 'mao_de_obras',
                    attributes: ['id', 'nome', 'preco',],
                    through: { attributes: ['preco'] },
                },
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['id', 'nome', 'email', 'nuit', 'contacto','endereco'],
                },

                {
                    model: Factura,
                    as: 'factura',
                    attributes: ['id','codigoFactura', 'estado', 'data', 'dataPagamento'],
                },
            ],
        });
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar todas as vendas:', error);
        throw error;
    }
};

// Função para buscar uma venda específica com detalhes
const getVendaByIdWithDetails = async (vendaId) => {
    try {
        const venda = await Venda.findByPk(vendaId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                },
                {
                    model: Produto,
                    as: 'produtos',
                    attributes: ['id', 'nome', 'preco','descricao','unidade'],
                    through: { attributes: ['quantidade'] },
                },
                {
                    model: MaoDeObra,
                    as: 'mao_de_obras',
                    attributes: ['id', 'nome', 'preco','categoria_id'],
                    through: { attributes: ['preco','quantidade'] },
                },
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['id', 'nome', 'email', 'nuit', 'contacto','endereco'],
                },
                {
                    model: Factura,
                    as: 'factura',
                    attributes: ['id','codigoFactura', 'estado', 'data', 'dataPagamento'],
                },
            ],
        });

        if (!venda) {
            throw new Error(`Venda com ID ${vendaId} não encontrada`);
        }

        return venda;
    } catch (error) {
        console.error('Erro ao buscar a venda específica:', error);
        throw error;
    }
};


module.exports = { realizarVenda, getAllVendasWithDetails, getVendaByIdWithDetails, cancelarVenda };
