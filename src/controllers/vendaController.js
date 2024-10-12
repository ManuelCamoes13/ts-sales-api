// controllers/vendaController.js
const vendaService = require('../services/vendaService');

const realizarVenda = async (req, res) => {
    try {
        const { user_id, cliente_id, produtos, mao_de_obras, imposto, desconto } = req.body;
        
        // Chama o serviço para realizar a venda
        const venda = await vendaService.realizarVenda(user_id, cliente_id, produtos,  mao_de_obras, imposto, desconto);
        
        res.status(201).json({ success: true, venda });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error)
    }
};
const getAllVendas = async (req, res) => {
    try {
        const vendas = await vendaService.getAllVendasWithDetails();
        return res.status(200).json(vendas); // Retorna as vendas em formato JSON
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        return res.status(500).json({ error: 'Erro ao buscar vendas' });
    }
};


module.exports = { realizarVenda, getAllVendas };
