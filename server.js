require("dotenv-safe").config();

const app = require('./config/express')();
const jwt = require('jsonwebtoken');
const port = app.get('port');
const env = app.get('env');

app.listen(port, () => {
    console.log(`Servidor inicializado na porta ${port} | Environment: ${env}`)
});
