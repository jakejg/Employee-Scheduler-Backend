const { DB_URI } = require('./config');
const { client, Client } = require('pg');

let db = new Client({
        connectionString: DB_URI,
        rejectUnauthorized: false
    })
db.connect();
console.log("Database connected")

module.exports = db;