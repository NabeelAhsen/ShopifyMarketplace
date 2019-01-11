/**
 * Router describing /products operations. This is not a protected resource.
 *
 * 2019 -- Nabeel Ahsen
 */

// ===== dependencies

const express = require('express');

const productsRouter = express.Router();

// ===== models

const product = require('../../models/Product');

// ===== api implementation for the carts router

// Get all products (limit 500), or paginated examples
productsRouter.get('/', (req, res) => {
  const { query: { page } } = req;

  // Check if a page is requested at all
  if (page !== undefined) {
    const pageNumber = (parseInt(page, 10) - 1) * 10;

    // check validity of page number
    if (Number.isNaN(pageNumber) || pageNumber < 0) {
      return res.status(400).send('Pages start at 1.');
    }

    // paginate products
    return product.findAllPaginated(pageNumber)
      .then(result => res.status(200).json(result))
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        return res.status(500).send('Internal server error.');
      });
  }

  // Else return all products
  return product.findAll()
    .then(result => res.status(200).json(result))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

// Get all products that are in stock
productsRouter.get('/in-stock', (req, res) => {
  const { query: { page } } = req;

  // Check if a page is requested at all
  if (page !== undefined) {
    const pageNumber = (parseInt(page, 10) - 1) * 10;

    // check validity of page number
    if (Number.isNaN(pageNumber) || pageNumber < 0) {
      return res.status(400).send('Pages start at 1.');
    }

    // paginate products
    return product.findAllInStockPaginated(pageNumber)
      .then(result => res.status(200).json(result))
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        return res.status(500).send('Internal server error.');
      });
  }

  // Else return all products
  return product.findAllInStock()
    .then(result => res.status(200).json(result))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

module.exports = productsRouter;
