/**
 * Router describing /carts operations. This is a protected resource.
 *
 * 2019 -- Nabeel Ahsen
 */

// ===== dependencies

const express = require('express');
const { ensureToken, verifyToken } = require('../middleware/validateToken');

const cartsRouter = express.Router();

// ===== models

const cart = require('../../models/Cart');
const products = require('../../models/Product');

// ===== helpers

const cartReducerFunction = (accumulator, currentValue) => {
  if (accumulator[currentValue.cart_id]) {
    accumulator[currentValue.cart_id].cart_total += currentValue.price;
    accumulator[currentValue.cart_id].products.push({
      title: currentValue.title,
      price: currentValue.price,
      inventory_count: currentValue.inventory_count,
    });
  } else {
    const total = currentValue.price || 0;
    const initialProduct = [];

    if (currentValue.price) {
      initialProduct.push({
        title: currentValue.title,
        price: currentValue.price,
        inventory_count: currentValue.inventory_count,
      });
    }

    accumulator[currentValue.cart_id] = {
      cart_total: total,
      cart_status: currentValue.status,
      products: initialProduct,
    };
  }
  return accumulator;
};

// ===== api implementation for the carts router

// Create a new cart for a user
cartsRouter.post('/', ensureToken, verifyToken, (req, res) => {
  const { user: { id } } = req;

  console.log(`Creating a new cart for user id ${id}`); // eslint-disable-line no-console

  cart.createOne(id)
    .then(result => res.status(201).send({
      cart_id: result.insertId,
      cart_total: 0,
      cart_status: 'Pending',
      products: [],
    }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

// Get all of a given user's carts.
cartsRouter.get('/', ensureToken, verifyToken, (req, res) => {
  const { user: { id } } = req;

  console.log(`Fetching cart data for user id ${id}`); // eslint-disable-line no-console

  return cart.findAll(id)
    .then((result) => {
      // reduce this cart to appropriate array
      const reduced = result.reduce(cartReducerFunction, {});
      return res.status(200).send(reduced);
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

cartsRouter.get('/:id', ensureToken, verifyToken, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;

  if (Number.isNaN(parseInt(cartId, 10))) {
    return res.status(404).send('Did you mean to search for a cart ID?');
  }

  return cart.findById(userId, cartId)
    .then((result) => {
    // reduce this cart to appropriate array
      const reduced = result.reduce(cartReducerFunction, {});
      return res.status(200).send(reduced);
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

// Allow users to add items to their carts
cartsRouter.put('/:id', ensureToken, verifyToken, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;
  const { body: { product } } = req;

  if (!product) {
    return res.status(400).send('Please specify a valid product you wish to add to the cart');
  }

  if (Number.isNaN(parseInt(cartId, 10))) {
    return res.status(404).send('Did you mean to search for a cart ID?');
  }

  return products.findInventoryOfProduct(product)
    .then((inventory) => {
      // Invalid or out-of-stock product provided
      if (inventory.length === 0 || inventory[0].inventory_count === 0) {
        return -1;
      }
      return cart.findById(userId, cartId);
    })
    .then((cartDetails) => {
      if (cartDetails === -1) {
        return cartDetails;
      }
      // Invalid cart
      if (cartDetails.length === 0 || cartDetails[0].status === 'Completed') {
        return -2;
      }

      return cart.addProductToCart(cartId, product);
    })
    .then((result) => {
      if (result === -1) {
        return res.status(400).send("This product doesn't seem to be in stock.");
      }
      if (result === -2) {
        return res.status(400).send('Please provide a valid, non-completed cart.');
      }
      return res.status(204).send(`Successfully added ${product} to your cart.`);
    })
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('The requested product is already in this cart.');
      }
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

// Finalize a cart
cartsRouter.post('/:id/complete', ensureToken, verifyToken, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;

  if (Number.isNaN(parseInt(cartId, 10))) {
    return res.status(404).send('Did you mean to search for a cart ID?');
  }

  return cart.findById(userId, cartId)
    .then((cartDetails) => {
      if (cartDetails.length === 0) {
        return -1;
      }

      if (cartDetails[0].status !== 'Pending') {
        return -2;
      }
      return cart.completeCart(cartId);
    })
    .then((result) => {
      if (result === -1) {
        return res.status(400).send('Please provide a valid, non-completed cart.');
      }
      if (result === -2) {
        return res.status(400).send('This cart has already been checked-out!');
      }
      return res.status(200).send('Cart successfully checked-out.');
    })
    .then(() => cart.purgeOutOfStocksFromCarts())
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

module.exports = cartsRouter;
