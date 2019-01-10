/**
 * Describes a carts model without the use of a standardized OMS system
 * This module is responsible for interacting with the database
 *
 * 2019 - Nabeel Ahsen
 */

const Promise = require('bluebird');
const getSqlConnection = require('../config/connectionPool');
const queries = require('./queries/cartsQueries.js');

/**
 * TODO: Document this object model
 */
class Cart {
  static createOne(userId) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.createNewCart, [userId])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static findAll(userId) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findAll, [userId])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static findById(userId, cartId) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findById, [userId, cartId])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static addProductToCart(cartId, product) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.addProductToCart, [cartId, product])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  // static findAllPaginated(page) {
  //   return Promise.using(
  //     getSqlConnection(),
  //     conn => conn.query(queries.findAllPaginated, [page])
  //       .then(res => res)
  //       .catch((err) => { throw err; }),
  //   );
  // }
  //
  // static findAllInStock() {
  //   return Promise.using(
  //     getSqlConnection(),
  //     conn => conn.query(queries.findAllInStock)
  //       .then(res => res)
  //       .catch((err) => { throw err; }),
  //   );
  // }
  //
  // static findAllInStockPaginated(page) {
  //   return Promise.using(
  //     getSqlConnection(),
  //     conn => conn.query(queries.findAllInStockPaginated, [page])
  //       .then(res => res)
  //       .catch((err) => { throw err; }),
  //   );
  // }
} // end of class Cart

module.exports = Cart;
