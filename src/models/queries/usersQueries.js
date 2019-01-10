/**
 * Export a set of queries to be executed on the database `users` table
 * @type {Object}
 */

module.exports = {
  findByUsername: 'SELECT * FROM users WHERE username = ?',
  createNewUser: 'INSERT INTO users(username, password) VALUES (?, ?);',
};
