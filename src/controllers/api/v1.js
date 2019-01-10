// TODO: Document
const express = require('express');

const usersRouter = require('../routers/usersRouter');

const v1 = express.Router();

v1.use('/users', usersRouter);

module.exports = v1;
