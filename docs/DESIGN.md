# Design decisions

## Tech stack

The tech stack I chose to use for this challenge is Node.js using the Express.js framework. I've used these in the past to build robust and secure API endpoints. Because of this stack's portability, I feel this marketplace API can easily be served as a microservice on cloud-based systems for scalability.

## Cart-based purchases

I had to make a design decision as to how carts are implemented in the context of multiple users trying to access the same products in their own private carts. Carts were made to be general enough that they could be made by any user, but private enough to be mapped to their respective creators.

Users are not able to request, change, or checkout carts that they did not create. This introduces some sense of privacy among multiple users on this api. While you might be requesting details of a cart you know exists, by its ID for example, my implementation enforces a preliminary check to verify that the requester is indeed the owner of the cart they are trying to interact with.

This design abstracts the general products away from the users who purchase them.

## Product inventory

Carts are not allowed to have products that are out of stock. When product inventories fall to 0, another design decision I had to make was to decide what to do with users who were not fast enough to purchase the last product, but still had it in their carts. Users can use their `Completed` carts as a form of transaction history to see what was bought in the past.

A feature I implemented was that every time a cart is checked out by a user, all items whose inventory counts become 0 are removed from current 'Pending' carts. This allows for two things:

- An immutable history of 'Completed' carts, despite out-of-stock products
- A customer who doesn't end up trying to buy an out-of-stock item through their carts

## Things I'd do differently had I the time

- Solve the ocean pollution crisis
- Introduce some level of TLS security on this API. Especially for an API that deals with user credentials; I believe there needs to be some form of encryption on communication channels.
- Serve this API on Heroku or other cloud hosted systems
- Pet more dogs tbh
