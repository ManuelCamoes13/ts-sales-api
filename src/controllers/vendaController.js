const vendaService = require('../services/vendaService');

const realizarVenda = async (req, res) => {
    try {
        const { user_id, cliente_id, produtos, mao_de_obras, imposto, desconto, isFactura, pagamentoAVista } = req.body;

        // Chama o serviço para realizar a venda
        const venda = await vendaService.realizarVenda(user_id, cliente_id, produtos, mao_de_obras, imposto, desconto, isFactura, pagamentoAVista);
console.log(venda)
        res.status(201).json({ success: true, venda });
    } catch (error) {
        console.error('Erro ao realizar venda:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancelarVenda = async (req, res) => {
    try {
        const { vendaId } = req.params;

        // Call the service to cancel the sale
        const result = await vendaService.cancelarVenda(vendaId);

        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        console.error('Error ao cancelar venda:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllVendas = async (req, res) => {
    try {
        const vendas = await vendaService.getAllVendasWithDetails();
        return res.status(200).json({ success: true, vendas }); // Retorna as vendas em formato JSON
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        return res.status(500).json({ success: false, message: 'Erro ao buscar todas vendas' });
    }
};

const getVendaById = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await vendaService.getVendaByIdWithDetails(id);

        if (!venda) {
            return res.status(404).json({ success: false, message: 'Venda não encontrada' });
        }

        return res.status(200).json({ success: true, venda });
    } catch (error) {
        console.error('Erro ao buscar venda:', error);
        return res.status(500).json({ success: false, message: 'Erro ao buscar venda' });
    }
};

module.exports = { realizarVenda, getAllVendas, getVendaById, cancelarVenda };
