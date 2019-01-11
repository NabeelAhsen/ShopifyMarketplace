# Security decisions

## Database

From [DATABASE.md](docs/DATABASE.md):

>> For this demo, passwords are NOT encrypted. If you are creating a new user to test the API, please do not send any sensitive data through the API. This database is not secure.

>> While there's some emphasis on security through out this API, I didn't feel it necessary to secure the database itself because that wasn't what I was trying to showcase with this API. The main point of introducing some security was to show how I would secure protected resources on a server.

## Endpoints

The notion of securing endpoints is something I've been recently reading and learning more about. For this challenge I decided to use the idea of client-oriented sessions to make this endpoint as open as possible. One tool I used to ensure this was [JSON Web Tokens (JWT)](https://jwt.io/).

**Users who authenticate against this API are sent signed jwts that are set to expire one hour after they're issued.**

Users can access protected resources, like `api/v1/carts` using JWTs. A JWT has a payload indicating a user's ID in the corresponding database. As discussed in the database doc, this ID isn't really secure unless it's randomized as a UUID. One might be able to guess the IDs of users in my database if they're simply auto-incrementing IDs.

With this knowledge, it's easy to reconstruct the payload of each JWT passed back to users. However, it wouldn't be as easy to sign fake JWTs unless you knew the server secret that was used to sign each JWT by this API's authority.

## Environment

Certain configuration variables, like database hostnames, password, and server/client secrets are used throughout this API. Since there isn't any risk, I sought to leave these variables in a configuration file that never gets pushed up to a repository. The idea is that everyone who pulls this repository needs to start from a configuration template and fill in their own details.

However, to secure these variables furthur, these variables would ideally be abstracted away to environment variables at the scope of the machine or process. Ultimately I would look into an encrypted storage system I've used in the past like [Hashicorp Vault](https://www.vaultproject.io/) to ensure minimal risk of these variables falling into wrong hands.

## Tech Stack

As with most projects using third-party libraries and frameworks, there is always a security risk involved. This project is no exception. In order to get a functional API within two nights, I relied on NPM packages for their convenience. To minimize security risk, I made sure to use well-revised packages and those widely regarded as "safe" by the NPM community. I regularly review audits done against the libraries I choose to use for projects.
