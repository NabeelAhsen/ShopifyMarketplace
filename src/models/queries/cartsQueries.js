/**
 * Export a set of queries to be executed on the database `carts` table
 * @type {Object}
 */

module.exports = {
  createNewCart: 'INSERT INTO carts(`user_id`) VALUE (?)',
  findAll: 'SELECT items_in_carts.cart_id, carts.status, products.title, products.price, products.inventory_count FROM carts JOIN items_in_carts ON carts.id = items_in_carts.cart_id JOIN products ON items_in_carts.product = products.title WHERE carts.user_id = ?',
  findById: 'SELECT items_in_carts.cart_id, carts.status, products.title, products.price, products.inventory_count FROM carts JOIN items_in_carts ON carts.id = items_in_carts.cart_id JOIN products ON items_in_carts.product = products.title WHERE carts.user_id = ? AND carts.id = ?',
  addProductToCart: 'INSERT INTO items_in_carts VALUES (?, ?)',
};
