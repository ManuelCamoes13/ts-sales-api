require('dotenv').config();  // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const routes = require('./src/routes/index');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Porta a ser usada pelo servidor
const bodyParser = require("body-parser");
const HOST = '0.0.0.0';
// Configurar rotas
app.use(cors()); // Permite chamadas de diferentes origens
app.use(express.json()); // Permite que o corpo da requisição seja lido como JSON (sem o body-parser)


app.use(bodyParser.urlencoded({ extended: true }));
// Rota padrão
app.use('/api', routes);

// Iniciar o servidor
app.listen(port,HOST, () => {
    console.log(`Servidor rodando na porta //${HOST}: ${port} `);
});
