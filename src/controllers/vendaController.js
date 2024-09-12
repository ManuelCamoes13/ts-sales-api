const saleService = require('../services/saleService');

const realizarVenda = (req, res) => {
    saleService.realizarVenda(req.body)
        .then(() => res.status(200).send('Venda realizada com sucesso'))
        .catch(err => res.status(500).send(err.message));
};

module.exports = { realizarVenda };
