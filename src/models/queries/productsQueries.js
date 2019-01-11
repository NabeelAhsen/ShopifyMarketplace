/**
 * Export a set of queries to be executed on the database `products` table
 * @type {Object}
 */

module.exports = {
  findAll: 'SELECT * FROM products LIMIT 1, 500',
  findAllPaginated: 'SELECT * FROM products LIMIT ?, 10',
  findAllInStock: 'SELECT * FROM products WHERE inventory_count > 0',
  findAllInStockPaginated: 'SELECT * FROM products WHERE inventory_count > 0 LIMIT ?, 10',
  findInventoryOfProduct: 'SELECT inventory_count FROM products WHERE title = ?',
};
