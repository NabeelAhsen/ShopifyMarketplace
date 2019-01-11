# ShopifyMarketplace

## Documentation

For further design documentation, please visit the following resources:

- [Shopify Marketplace API][api] - Documentation for the entire  functional API.
- [DATABASE.md][database] - Outlines the schema and decisions made for the provisioned DB.
- [SECURITY.md](#) - Discusses the security decisions made for the tech stack as well as the API. Describes the use of JWT for authentication.
- [SYSTEM_DESIGN.md](#) - Describes the overall intended design of the marketplace shopping experience. Outlines nuances and shortcomings.

## Getting started

This api has been built for Shopify's 2019 developer challenge. The tech stack used is node.js using the express framework for building apis along with a MySQL database.

**You can interact with this API using NPM. Ensure you've got Node installed using [Node Version Manager][nvm]. Simply run `nvm use` in the root of this repository.**

For the time being, this application is intended to be served locally. However, a MySQL database has been provisioned on AWS for the purposes of demoing. If you're a reviewer, you should have received credentials to the database with the 2019 challenge submission. If you can't seem to find the credentials, please reach out to me.

---

To begin, fork this repository and initiate the project by running the following in a terminal.

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

> shopifymarketplace@1.0.0 test-db /ShopifyMarketplace
> mocha --timeout 5000 --recursive --reporter spec --sort --exit



  Connection to MySQL database
    Refuse connection if credentials are wrong
      ✓ should refuse connection if password is wrong (64ms)
      ✓ should refuse connection if the host is wrong
      ✓ should refuse connection if trying to connect to the wrong database
      ✓ should connect to the correct database


  4 passing (82ms)
```

To start the server, simply run `npm run serve` and try to hit a simple [endpoint](#) using your favorite API dev environment. I used [Postman][postman] for development.

```sh
npm run serve

> [ShopifyMarketplace: Fri Jan 11 2019 09:54:22 GMT-0500 (Eastern Standard Time)] - Listening on port 3000
```

```
GET localhost:3000/marketplace/api/v1/

RESPONSE 200

"WOOF WOOF BORK!"
```

---

## Sample shopping flows :shipit:

> Consult with [Shopify Marketplace API](https://documenter.getpostman.com/view/5189379/RznHHwk1) for complete API capabilities

### Browsing available products

To view all (top 500, by implementation) products, you can hit the following non-protected endpoint.

```
GET /marketplace/api/v1/products
```

This might result in quite a bit of products, so let's narrow down to the first 10 products.

```
GET /marketplace/api/v1/products?page=1

RESPONSE 200 OK

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

RESPONSE 200 OK

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

> Some of the ids returned in body responses may differ for you

Products that have been added to carts can be purchased by completing a cart. Carts are protected resources available only to authenticated users. For the demo, a user has been created already. Alternatively, you can create your own user (**please do not use any real passwords. See security doc for more info on the database.**).

First, try to access your carts without authentication.

```
GET /marketplace/api/v1/carts

RESPONSE 403 Forbidden

"You are not authenticated to view this resource.""
```

Let's authenticate with our demo user.

```
POST /marketplace/api/v1/carts/authenticate

Body:
  {username: "demo", password: "password"}
Headers:
  {content-type: "application/x-www-form-urlencoded"}

RESPONSE 200 OK

{
    "message": "Authenticated",
    "token": "<json web token>"
}
```

You can copy the token from the response body and attach it on an Authentication header as a "Bearer token". Let's try creating a cart now for this user.

```
POST /marketplace/api/v1/carts

Headers:
  {authentication: "Bearer <json web token>"}

RESPONSE 201 Created

{
    "cart_id": 9,
    "cart_total": 0,
    "cart_status": "Pending",
    "products": []
}
```

Each cart has one of two statuses: `Pending` or `Completed`. Pending carts indicate they can still be interacted with, where Completed carts are a way to view your order history. They can not be changed or re-purchased. Carts also have associated `cart_id`s, which you use to update and purchase products with. A collection of `products` that get added to your carts are returned as a list of products, with their total value updated in `cart_total`.

While browsing earlier, a product had caught our eye. It was Iron Man's suit!

```
GET /marketplace/api/v1/products/in-stock?page=7

RESPONSE 200 OK

[
    ...
    {
        "title": "Iron Man's Suit - MK III",
        "price": 1000000000.72,
        "inventory_count": 10
    },
    {
        "title": "keyboard",
        "price": 305.69,
        "inventory_count": 5
    },
    ...
]

```

Let's add this to our newly created cart with cart_id `9` (Who the heck doesn't want Tony Stark's suit?).

```
PUT /marketplace/api/v1/carts/9

Body:
  {product: "Iron Man's Suit - MK III"}
Headers:
  {content-type: "application/x-www-form-urlencoded", authentication: "Bearer <json web token>"}

RESPONSE 204 No Content
```

Let's also add a `keyboard` to our cart and verify that our cart has been updated accordingly:

```
GET /marketplace/api/v1/carts/9

Headers:
  {authentication: "Bearer <json web token>"}

RESPONSE 200 OK

{
    "9": {
        "cart_total": 1000000306.41,
        "cart_status": "Pending",
        "products": [
            {
                "title": "Iron Man's Suit - MK III",
                "price": 1000000000.72,
                "inventory_count": 10
            },
            {
                "title": "keyboard",
                "price": 305.69,
                "inventory_count": 5
            }
        ]
    }
}
```

Completing this cart now would indicate that you've purchased the cart. The total `inventory_counts` should be reduced by 1 for each item you've added to your cart.

```
POST /marketplace/api/v1/carts/9/complete

Headers:
  {authentication: "Bearer <json web token>"}

RESPONSE 200 OK

"Cart successfully checked-out."
```

To verify that items have truly been purchased, get a list of all of your carts. Notice that the inventory counts of Iron man's suit and the keyboard product have decremented by 1.

```
GET /marketplace/api/v1/carts

Headers:
  {authentication: "Bearer <json web token>"}

RESPONSE 200 OK

{
    ...
    "9": {
        "cart_total": 1000000306.41,
        "cart_status": "Completed",
        "products": [
            {
                "title": "Iron Man's Suit - MK III",
                "price": 1000000000.72,
                "inventory_count": 9
            },
            {
                "title": "keyboard",
                "price": 305.69,
                "inventory_count": 4
            }
        ]
    },
    ...
}
```

Your cart's status has been updated to `Completed` and the total inventory counts of the two products have reduced by 1. Congratulations, you're now a proud owner of Iron Man's suit! It's OK, just put it on the company card. :smirk:

### Multi-user shopping experience

Some important things to note on carts:

- Users can only view and operate on carts owned by them. Cart Ids can easily be guessed, but can't be accessed
- Products with an inventory count of 0 cannot be added to a cart. (Go ahead, try to add a product with `inventory_count` 0 to an available cart)
- A user is able to obtain information a specific cart they own along with every carts they've ever created.
- Empty carts can be completed to indicate they no should not longer be used.
- Products that are purchased reduce the total inventory counts of products across the database.

So what happens when two users have added the same product to their respective carts, but that product only has an `inventory_count` of 1? What happens when someone purchases this product?

The short answer: It becomes a race condition to see who checks out their carts the fastest. Every cart completion ensures that any product that has reached an inventory count of 0 is removed from all other Pending carts. (Note: this doesn't remove items from Completed carts, because they are immutable)

Consider the following scenario between `User1` and `User2`.

`User1` and `User2` both have the following carts, respectively:

```
User1's cart:

"1": {
    "cart_total": 87.96,
    "cart_status": "Pending",
    "products": [
        {
            "title": "hair brush",
            "price": 87.96,
            "inventory_count": 1
        }
    ]
}


User2's cart:

"2": {
    "cart_total": 647.47,
    "cart_status": "Pending",
    "products": [
        {
            "title": "hair brush",
            "price": 87.96,
            "inventory_count": 1
        },
        {
            "title": "drill press",
            "price": 68.29,
            "inventory_count": 15
        },
        {
            "title": "eraser",
            "price": 491.49,
            "inventory_count": 36
        },
    ]
}
```

When User 1 proceeds to check out their cart, the resulting carts as follows:

```
User1's cart:

"1": {
    "cart_total": 87.96,
    "cart_status": "Complete",
    "products": [
        {
            "title": "hair brush",
            "price": 87.96,
            "inventory_count": 0
        }
    ]
}


User2's cart:

"2": {
    "cart_total": 559.51,
    "cart_status": "Pending",
    "products": [
        {
            "title": "drill press",
            "price": 68.29,
            "inventory_count": 15
        },
        {
            "title": "eraser",
            "price": 491.49,
            "inventory_count": 36
        },
    ]
}
```

`User2`'s resulting cart no longer has the hairbrush, and they cannot add it again to their carts. If you ask me, they dodged a bullet cause who pays $88 for a hairbrush?

**credentials:** shopaway/shopawayfrends

<!-- links -->
[api]: https://documenter.getpostman.com/view/5189379/RznHHwk1
[database]: docs/DATABASE.md
[security]:
[system_design]:

[postman]: https://www.getpostman.com/
[nvm]: https://github.com/creationix/nvm
