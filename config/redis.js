const redis = require('redis');
const config = require('config');

module.exports = () => {
    return redis.createClient({
        host: config.get('redis.host'),
        port: config.get('redis.port')
    });
}
