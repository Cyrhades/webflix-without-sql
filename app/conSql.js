const mysql = require('mysql2');
const dotenv = require("dotenv")
dotenv.config();

// create the connection to database
exports.connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME
});