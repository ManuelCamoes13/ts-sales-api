const db = require('./db');

const realizarVenda = (req, res) => {
    const { produtoId, clienteId, quantidade, custoMaoObra, imposto } = req.body;

    // Verificar se o produto tem estoque suficiente
    db.query('SELECT * FROM produtos WHERE id = ?', [produtoId], (err, resultados) => {
        if (err || resultados.length === 0) return res.status(404).send('Produto não encontrado');

        const produto = resultados[0];

        if (produto.quantidade < quantidade) return res.status(400).send('Estoque insuficiente');

        // Registrar a venda
        const query = 'INSERT INTO vendas (produto_id, cliente_id, quantidade, custo_mao_obra, imposto) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [produtoId, clienteId, quantidade, custoMaoObra, imposto], (err) => {
            if (err) return res.status(500).send('Erro ao realizar venda');

            // Atualizar o estoque do produto
            const novaQuantidade = produto.quantidade - quantidade;
            db.query('UPDATE produtos SET quantidade = ? WHERE id = ?', [novaQuantidade, produtoId], (err) => {
                if (err) return res.status(500).send('Erro ao atualizar estoque');
                res.status(200).send('Venda realizada e estoque atualizado');
            });
        });
    });
};

module.exports = { realizarVenda };
