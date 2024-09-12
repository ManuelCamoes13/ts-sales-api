const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

const registrarUtilizador = async ({ name, email, password, type }) => {
    const senhaCriptografada = bcrypt.hashSync(password, 8);
    return User.create({ name, email, password: senhaCriptografada, type });
};

const loginUtilizador = async ({ email, password }) => {
    // Verifique se o email e a senha foram fornecidos
    if (!email || !password) {
        throw new Error('Email e senha são necessários');
    }

    // Procure o usuário pelo email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
        throw new Error('Utilizador não encontrado');
    }

    // Verifique se a senha é válida
    const senhaValida = bcrypt.compareSync(password, user.password);
    if (!senhaValida) {
        throw new Error('Senha inválida');
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, type: user.type }, jwtSecret, { expiresIn: '1h' });

    // Retorne os dados do usuário, exceto a senha
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        // Qualquer outro campo que você queira retornar
    };

    return { auth: true, token, user: userData };
};

module.exports = { registrarUtilizador, loginUtilizador };
