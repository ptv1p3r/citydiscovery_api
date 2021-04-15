require("dotenv-safe").config();
const config = require('config');
const app = require('./config/express')();
const redisClient = require('./config/redis')();

const port = app.get('port');
const env = app.get('env');

redisClient.on("connect", function () {
    console.log(`+ Redis inicializado em: ${config.get('redis.host')} na porta: ${config.get('redis.port')}`);
});

redisClient.on("error", function (err) {
    console.log('- Redis erro:' + err);
});

app.listen(port, () => {
    console.log(`+ Servidor inicializado na porta ${port} | Environment: ${env}`)
});
