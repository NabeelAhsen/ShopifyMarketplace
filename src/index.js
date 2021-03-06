/**
 * This is the entry point to ShopifyMarketplace's server api.
 * The code written in this project is documented in the guides subfolder and
 * can be accessed via GitHub.
 *
 * Nabeel Ahsen - 2019
 */

// ===== dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===== import api version-X
const v1 = require('./controllers/api/v1');

app.use('/marketplace/api/v1', v1);

// ===== server
app.listen(port, () => {
  console.info(`[ShopifyMarketplace: ${Date()}] - Listening on port ${port}`); // eslint-disable-line no-console
});
