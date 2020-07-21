// ./db/index.js

// Requires and exports all db functions
const sync = require("./sync");

module.exports = {
    sync,
    ...require("./users"),
    ...require("./carts"),
    ...require("./categories"),
    ...require("./orders"),
    ...require("./products"),
    ...require("./reviews"),
    ...require("./shops"),
    ...require("./cart_products"),
    ...require("./category_products"),
    ...require("./order_products"),
    ...require("./product_reviews"),
    ...require("./user_orders"),
    ...require("./user_products"),
    ...require("./images.js"),
};
