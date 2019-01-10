/**
 * Router describing /carts operations. This is a protected resource.
 *
 * 2019 -- Nabeel Ahsen
 */

// ===== dependencies

const express = require('express');
const { ensureToken, verifyToken } = require('../middleware/validateToken');

const cartsRouter = express.Router();

// ===== api implementation for the carts router

// Get all of a given user's carts.
cartsRouter.get('/', ensureToken, verifyToken, (req, res) => {
  const { user: { id } } = req;

  console.log(`Fetching cart data for user id ${id}`); // eslint-disable-line no-console

  res.status(200).send();
});

module.exports = cartsRouter;
