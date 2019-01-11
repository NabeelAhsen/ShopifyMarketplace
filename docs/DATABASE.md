# Database

## Design decisions

For this challenge, I decided to use a SQL database to represent products and cart purchases. It required the least overhead in terms of ensuring relations between carts and products. Marketplace scenarios are generally taught in all relational database courses. For the complete schema, check the document found in `schema/tables/shopify_marketplace_2019-01-10.sql`.

The schema is fairly simple. The database consists of four main tables:

- `users`
- `products`
- `carts`
- `items_in_carts`

Users and carts are identified with auto-incrementing IDs started at `1`. Normally I would generate [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) to ensure that user IDs aren't easily guessable by malicious parties. The same would go with carts. However, demoing this would become rather tedious, so I decided to leave IDs be represented by integers.

The table `users` have very little to do with the overall API other than for authentication purposes and for ensuring carts are access-controlled. In the past, I've used encryption libraries to ensure both passwords and the database columns are encrypted. **For this demo, passwords are NOT encrypted.** If you are creating a new user to test the API, please do not send any sensitive data through the API. This database is not secure.

While there's some emphasis on security through out this API, I didn't feel it necessary to secure the database itself because that wasn't what I was trying to showcase with this API. The main point of introducing some security was to show how I would secure protected resources on a server.

For the demo, I've provisioned a database on AWS for testing purposes. It is pre-populated with products and a demo user. If you're a reviewer, I have attached the credentials to this database in the challenge submission document. There is a very limited suit of connectivity tests in place to verify connections to the database. I highly recommend running these tests before attempting to spin up the node server (more about this in the README.md).

## Products

The products pre-populated in the db where randomly generated. I used a math library to generate float values to randomly generate prices for products, and random integers to represent their inventory counts. Each value was mapped to a randomly generated object through an online API that generates random objects: https://www.randomlists.com/things
