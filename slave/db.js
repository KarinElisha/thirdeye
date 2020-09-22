const { Client } = require('pg');
const config = require('./../config.json');
const client = new Client({
    user: config.db.username,
    host :config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port
})
module.exports = client;