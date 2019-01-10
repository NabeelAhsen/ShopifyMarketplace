/**
 * This module provides a pool of database connections
 *
 * 2019 - Nabeel Ahsen
 */

const mysql = require('promise-mysql');
const env = require('./envConfig.js');

const dbConnectionOptions = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: env.DB_CONNECTION_LIMIT || 5,
};

const pool = mysql.createPool(dbConnectionOptions);

// Collects a db connection and initiaties a disposer function
// on release of that connection
const getSqlConnection = () => pool.getConnection().disposer((connection) => {
  pool.releaseConnection(connection);
});

module.exports = getSqlConnection;
