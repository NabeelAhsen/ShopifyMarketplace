# ShopifyMarketplace

## Documentation

For further design documentation, please visit the following markdowns:

- [Shopify Marketplace API](https://documenter.getpostman.com/view/5189379/RznHHwk1) - Documentation for the entire  functional API.
- [DATABASE.md](#) - Outlines the schema and decisions made for the provisioned DB.
- [SECURITY.md](#) - Discusses the security decisions made for the tech stack as well as the API. Describes the use of JWT for authentication.
- [SYSTEM_DESIGN.md](#) - Describes the overall intended design of the marketplace shopping experience. Outlines nuances and shortcomings.

## Getting started

This api has been built for Shopify's 2019 developer challenge. The tech stack used is node.js using the express framework for building apis along with a MySQL database.

**You can interact with this API using NPM. Ensure you've got Node installed using [Node Version Manager](https://github.com/creationix/nvm). Simply run `nvm use` in the root of this repository.**

For the time being, this application is intended to be served locally. However, a MySQL database has been provisioned on AWS for the purposes of demoing. If you're a reviewer, you should have received credentials to the database with the 2019 challenge submission. If you can't seem to find the credentials, please reach out to me.

---

To begin, fork this repository and initiate the project by running the following.

```sh
npm run init
```

The file `src/config/envConfig.js` should have been created for you. Please use the database credentials provided in the submission to fill out the following variables:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `SECRET`

Feel free to write any string for the `SECRET` variable. It's the key used to sign and verify tokens for authentication. A full discussion on the security of these variables can be found in  [SECURITY.md](#).

If everything's configured, the following connectivity tests should pass. If you're unable to connect to the database, please check your firewall settings.

```
npm run test-db

> shopifymarketplace@1.0.0 test-db /Users/nabeelahsen/Documents/ShopifyMarketplace
> mocha --timeout 5000 --recursive --reporter spec --sort --exit



  Connection to MySQL database
    Refuse connection if credentials are wrong
      ✓ should refuse connection if password is wrong (64ms)
      ✓ should refuse connection if the host is wrong
      ✓ should refuse connection if trying to connect to the wrong database
      ✓ should connect to the correct database


  4 passing (82ms)
```

To start the server, simply run `npm run serve` and try to hit a simple [endpoint](#) using your favorite API dev environment. I used [Postman](https://www.getpostman.com/) for development.

```sh
npm run serve

> [ShopifyMarketplace: Fri Jan 11 2019 09:54:22 GMT-0500 (Eastern Standard Time)] - Listening on port 3000
```

```
GET localhost:3000/marketplace/api/v1/

> "WOOF WOOF BORK!"
```

---

## Sample shopping flows

> Consult with [Shopify Marketplace API]() for a complete API and capabilities

### Browsing available products

To view all (top 500, by implementation) products, you can hit the following non-protected endpoint.

```
GET /marketplace/api/v1/products
```

This might result in quite a bit of products, so let's narrow down to the first 10 products.

```
GET /marketplace/api/v1/products?page=1

RESPONSE

[
    {
        "title": "air freshener",
        "price": 46.31,
        "inventory_count": 10
    },
    ...
    {
        "title": "book",
        "price": 229.53,
        "inventory_count": 0
    }
]
```

Each product has an inventory count available along with a price value. Let's narrow down our search to products that are in stock (i.e have a non-zero inventory count).

```
GET /marketplace/api/v1/products/in-stock?page=1

RESPONSE

[
    {
        "title": "air freshener",
        "price": 46.31,
        "inventory_count": 10
    },
    ...
    {
        "title": "boom box",
        "price": 219.87,
        "inventory_count": 10
    }
]
```

Similarly, omitting the page query parameter will just dump the top 500 in-stock products. Product correspondence is facilitated through their titles. Check the next section to see how to purchase products.

### Comprehensive user shopping session

### Multi-user shopping experience



**credentials:** shopaway/shopawayfrends

<!-- links -->
