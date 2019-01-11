/**
 * Export a set of queries to be executed on the database `carts` table
 * @type {Object}
 */

module.exports = {
  createNewCart: 'INSERT INTO carts(`user_id`) VALUE (?)',
  findAll: 'SELECT c.id as cart_id, c.status, p.title, p.price, p.inventory_count FROM carts c LEFT JOIN items_in_carts iic ON c.id = iic.cart_id LEFT JOIN products p ON iic.product = p.title WHERE c.user_id = ?',
  findById: 'SELECT c.id as cart_id, c.status, p.title, p.price, p.inventory_count FROM carts c LEFT JOIN items_in_carts iic ON c.id = iic.cart_id LEFT JOIN products p ON iic.product = p.title WHERE c.user_id = ? AND c.id = ?',
  addProductToCart: 'INSERT INTO items_in_carts VALUES (?, ?)',
  completeCart: 'UPDATE products p JOIN items_in_carts iic ON p.title = iic.product JOIN carts c on c.id = iic.cart_id SET p.inventory_count = p.inventory_count -1, c.status = \'Completed\' WHERE c.id = ?',
  purgeOutOfStocksFromCarts: 'DELETE items_in_carts FROM items_in_carts LEFT JOIN carts on carts.id = items_in_carts.cart_id JOIN products on products.title = items_in_carts.product WHERE products.inventory_count = 0 AND carts.status = \'Pending\'',
};
