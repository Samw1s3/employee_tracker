const mysql = require('mysql2/promise');

require('dotenv').config();

// expose a mysql db connection
async function connect(){

    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "employess_cms",
    });
}

module.exports = {
    connect
}