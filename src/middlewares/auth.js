const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const verificarToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('Token não fornecido.');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send('Falha ao autenticar o token. ' + err.message); // Inclui mensagem de erro
        }

        // Salva o ID e tipo do usuário no objeto de requisição para uso posterior
        req.userId = decoded.id;
        req.userType = decoded.type;
        next();
    });
};

module.exports = { verificarToken };
