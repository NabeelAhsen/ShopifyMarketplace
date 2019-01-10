/**
 * A basic router for managing user creation and user authentication.
 * Basic JWTs are used for primitive security control.
 *
 * This router is intended to allow clients the ability to create users in a
 * database and authenticate them, generating a JWT that lasts for 1 hour before
 * expiry.
 *
 * Nabeel Ahsen - 2019
 */

// ===== dependencies

const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('../../config/envConfig');

const usersRouter = express.Router();

// ===== models

const user = require('../../models/User');

// ===== configuration options

const tokenOptions = {
  algorithm: 'HS256',
  expiresIn: '1 hour',
  issuer: 'Shopify Marketplace Demo',
};

// ===== api implementation for the users router

// Accept incoming requests to authenticate a user
usersRouter.post('/authenticate', (req, res) => {
  const { body: { username, password } } = req;

  if (!username || !password) {
    return res.status(400).send('Please send a username and password.');
  }

  // find a specific user and verify that passwords match
  // Note: case sensitive
  return user.findByUsername(username)
    .then((result) => {
      if (result.length === 0) {
        return res.status(400).send('Could not authenticate your credentials.');
      }
      if (result[0].password === password) {
        // generate a token for successful authentication, signed with secret
        const payload = { id: result[0].id };
        const token = jwt.sign(payload, env.SECRET, tokenOptions);

        return res.status(200).json({ message: 'Authenticated', token });
      }
      return res.status(400).send('Could not authenticate your credentials.');
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).send('Internal server error.');
    });
});

// Create a new user
usersRouter.post('/', (req, res) => {
  const { body: { username, password } } = req;

  if (!username || !password) {
    return res.status(400).send('Please send a username and FAKE password. DO NOT use a real password.');
  }
  return user.createNewUser(username, password).then(() => {
    res.status(200).send('User successfully created. Please authenticate.');
  }).catch((err) => {
    console.error(err); // eslint-disable-line no-console
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).send('The username you\'re trying to create already exists');
    }
    return res.status(500).send('Internal server error.');
  });
});

module.exports = usersRouter;
