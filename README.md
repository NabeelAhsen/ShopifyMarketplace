# ShopifyMarketplace

## Documentation

For further design documentation, please visit the following markdowns:

- [API.md](#) - Documentation for the entire  functional API.
- [DATABASE.md](#) - Outlines the schema and decisions made for the provisioned DB.
- [SECURITY.md](#) - Discusses the security decisions made for the tech stack as well as the API. Describes the use of JWT for authentication.
- [SYSTEM_DESIGN.md](#) - Describes the overall intended design of the marketplace shopping experience. Outlines nuances and shortcomings.

## Getting started

This api has been built for Shopify's 2019 developer challenge. The tech stack used is node.js using the express framework for building apis along with a MySQL database.

**This API is designed to work in a local environment provided that you have [npm](#) installed along with Node >=v10 and a MySQL database.**

Should time permit, a cloud-serviced MySQL database will be provisioned for the purposes of demoing. If such a database is not provided, you may have to configure MySQL locally or on a cloud-hosted platform (such as AWS).

---

To begin, fork this repository and initiate the project by running

```
npm run serve
```

## Sample user session walkthrough

**credentials:** shopaway/shopawayfrends
