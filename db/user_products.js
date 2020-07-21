// ./db/user_products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Adds productId to associated userId in user_products table
const addProductToUser = async (productId, userId) => {
    try {
        const {
            rows: [result],
        } = await client.query(
            `
            INSERT INTO user_products("productId","userId")
            VALUES ($1,$2)
            RETURNING *;
            `,
            [productId, userId]
        );

        return result;
    } catch (error) {
        console.error(
            `There's been an error adding a user to a product @ addUserToProduct(productId, userId) in ./db/user_products.js. ${error}`
        );
        throw error;
    }
};

// Removes productId from associated userId in user_products table
const deleteProductFromUser = async (userProductId) => {
    try {
        const isUserProduct = await getUserProductById(userProductId);

        if (isUserProduct) {
            const {
                rows: [deletedResult],
            } = await client.query(
                `
                DELETE FROM user_products
                WHERE id=$1
                RETURNING *;
            `,
                [userProductId]
            );

            return deletedResult;
        } else {
            throw {
                name: "UserProductNotFoundError",
                message: "Cannot find user product with that userProductId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error deleting a user from a product @ deleteProductFromUser(userProductId) in ./db/user_products.js. ${error}`
        );
        throw error;
    }
};

// Returns user product object connected to provided userProductId
const getUserProductById = async (userProductId) => {
    try {
        const {
            rows: [userProduct],
        } = await client.query(
            `
            SELECT * FROM user_products
            WHERE id=$1;
        `,
            [userProductId]
        );

        return userProduct;
    } catch (error) {
        console.error(
            `There's been an error getting a user product by id @ getUserProductById(userProductId) in ./db/user_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all userProduct objects associated with the specified product id, if any
const getUserProductsByProductId = async (productId) => {
    try {
        const { rows: userProductsArr } = await client.query(
            `
            SELECT * FROM user_products
            WHERE "productId"=$1;
        `,
            [productId]
        );

        return userProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting user products by product id @ getUserProductsByProductId(productId) in ./db/user_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all userProduct objects associated with the specified userId, if any
const getUserProductsByUserId = async (userId) => {
    try {
        const { rows: userProductsArr } = await client.query(
            `
            SELECT * FROM user_products
            WHERE "userId"=$1;
        `,
            [userId]
        );

        return userProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting user products by user id @ getUserProductsByUserId(productId) in ./db/user_products.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToUser,
    deleteProductFromUser,
    getUserProductsByProductId,
    getUserProductsByUserId,
};
