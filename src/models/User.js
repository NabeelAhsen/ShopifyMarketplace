/**
 * Describes a users model without the use of a standardized OMS system
 * This module is responsible for interacting with the database
 *
 * 2019 - Nabeel Ahsen
 */

const Promise = require('bluebird');
const getSqlConnection = require('../config/connectionPool');
const queries = require('./queries/usersQueries.js');

/**
 * TODO: Document this object model
 */
class User {
  static findByUsername(username) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.findByUsername, [username])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }

  static createNewUser(username, password) {
    return Promise.using(
      getSqlConnection(),
      conn => conn.query(queries.createNewUser, [username, password])
        .then(res => res)
        .catch((err) => { throw err; }),
    );
  }
} // end of class User

module.exports = User;
