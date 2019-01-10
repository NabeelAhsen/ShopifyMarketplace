/**
 * Describes a products model without the use of a standardized OMS system
 * This module is responsible for interacting with the database
 *
 * 2019 - Nabeel Ahsen
 */

const Promise = require('bluebird');
const getSqlConnection = require('../config/connectionPool');
const queries = require('./queries/productsQueries.js');

/**
 * TODO: Document this object model
 */
class Product {
  static findAll() {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findAll)
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static findAllPaginated(page) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findAllPaginated, [page])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static findAllInStock() {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findAllInStock)
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static findAllInStockPaginated(page) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findAllInStockPaginated, [page])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }
} // end of class Product

module.exports = Product;
