/**
 * Version 1 of the ShopifyMarketplace API
 */

const express = require('express');
const usersRouter = require('../routers/usersRouter');
const cartsRouter = require('../routers/cartsRouter');

const v1 = express.Router();

v1.use('/users', usersRouter);
v1.use('/carts', cartsRouter);

module.exports = v1;
