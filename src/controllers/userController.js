const userService = require('../services/userService');

const registrarUtilizador = (req, res) => {
    userService.registrarUtilizador(req.body)
        .then(() => res.status(201).send('Utilizador registrado com sucesso'))
        .catch(err => res.status(500).send(err.message));
};

const loginUtilizador = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email e senha são necessários');
    }

    userService.loginUtilizador(req.body)
        .then(({ auth, token, user }) => res.status(200).send({ auth, token, user })) // Retorna os dados do usuário sem a senha
        .catch(err => res.status(400).send(err.message));
};
// Listar utilizadores
const listarUsers = (req, res) => {
    userService.listarUsers()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).send(err.message));
};



module.exports = { registrarUtilizador, loginUtilizador , listarUsers};
