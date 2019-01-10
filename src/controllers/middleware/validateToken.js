/**
 * This file describes a few middleware functions to verify tokens to ensure
 * they're not expired or tampered.
 *
 * 2019 - Nabeel Ahsen
 */

const jwt = require('jsonwebtoken');
const env = require('../../config/envConfig');

// Ensures the existence of a jwt
const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send('You are not authenticated to view this resource.');
  }
};

// Verifies the validity of a jwt
const verifyToken = (req, res, next) => {
  jwt.verify(
    req.token,
    env.SECRET,
    { issuer: 'Shopify Marketplace Demo' },
    (err, data) => {
      if (err) {
        res.status(403).json({
          message: err.message,
          at: err.expiredAt,
        });
      } else {
        req.user = data;
        next();
      }
    },
  );
};

module.exports = {
  ensureToken,
  verifyToken,
};
