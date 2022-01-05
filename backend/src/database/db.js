const {Client} = require('pg');

const client = new Client({
    host:'localhost',
    port:5432,
    user:'postgres',
    password:'Password$@1234',
    database:'vpms'
});

client.connect();

module.exports = client;