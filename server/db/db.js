const mysql = require('mysql2/promise');

const mysqlpool = mysql.createPool({
        host:process.env.HOST,
        user : process.env.USER,
        password:process.env.SQL_PASSWORD,
        database:process.env.DATABASE_NAME,

})

module.exports = mysqlpool;