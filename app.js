// app.js
require('dotenv').config();  // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Porta a ser usada pelo servidor

// Configurar rotas
// Middleware
app.use(cors()); // Permite chamadas de diferentes origens
app.use(bodyParser.json()); // Permite que o corpo da requisição seja lido como JSON
// Rota padrão
app.use('/api', routes);


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
