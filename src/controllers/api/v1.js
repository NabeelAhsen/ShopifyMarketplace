/**
 * Version 1 of the ShopifyMarketplace API
 */

const express = require('express');
const usersRouter = require('../routers/usersRouter');
const cartsRouter = require('../routers/cartsRouter');
const productsRouter = require('../routers/productsRouter');

const v1 = express.Router();

v1.use('/users', usersRouter);
v1.use('/carts', cartsRouter);
v1.use('/products', productsRouter);

v1.get('/', (req, res) => res.status(200).send('WOOF WOOF BORK!'));

module.exports = v1;
