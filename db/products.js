// ./db/products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// name VARCHAR(255) NOT NULL,
// description TEXT NOT NULL,
// price FLOAT(2) NOT NULL,
// qtyAvailable INTEGER NOT NULL,
// delivery TEXT [],
// rating FLOAT(1),
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// "categoryId" INTEGER []

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");
const { getReviewsByProductId, deleteReview } = require("./reviews");
const {
    addProductToUser,
    deleteProductFromUser,
    getUserProductsByProductId,
} = require("./user_products");
const {
    addCategoryToProduct,
    getCategoryProductsByProductId,
    removeCategoryFromProduct,
} = require("./category_products");
const {
    removeProductFromCart,
    getCartProductsByProductId,
} = require("./cart_products");

/*---------------------------------- Functions ---------------------------------------*/

// Creates a new product in the products table and returns the new product object
const createProduct = async ({
    name,
    description,
    price,
    qtyAvailable,
    delivery = "{}",
    rating,
    userId,
    categoryId = "{}",
}) => {
    try {
        const {
            rows: [product],
        } = await client.query(
            `INSERT INTO products (name, description, price, "qtyAvailable", delivery, rating, "userId", "categoryId")
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
            `,
            [
                name,
                description,
                price,
                qtyAvailable,
                delivery,
                rating,
                userId,
                categoryId,
            ]
        );

        // Add newly created product to user_products table
        const userProductsResult = await addProductToUser(
            product.id,
            product.userId
        );

        //For each category the product is being associated with, create an entry in the category_products table for it
        const targetCategoryArr = categoryId
            .slice(1, categoryId.length - 1)
            .split("");
        const finalCategoryArr = targetCategoryArr.filter(
            (char) => char !== " " && char !== ","
        );
        const prodcutCategories = await Promise.all(
            finalCategoryArr.map(async (categoryId) => {
                return await addCategoryToProduct(categoryId, product.id);
            })
        );

        return product;
    } catch (error) {
        console.error(
            `There's been an error creating a product @ createProduct({ name, description, price, "qtyAvailable", delivery={}, rating, userId, categoryId={} }) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Updates a product in the products table and returns the updated product object
const updateProduct = async (id, fields = {}) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [product],
        } = await client.query(
            `
          UPDATE products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
            Object.values(fields)
        );

        return product;
    } catch (error) {
        console.error(
            `There's been an error updating a product @ updateProduct(id, fields = {}) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Deletes a product from the products table and returns the deleted product object
const deleteProduct = async (productId) => {
    try {
        //need to delete cart products with this product id
        const cartProducts = await getCartProductsByProductId(productId);

        if (cartProducts && cartProducts.id) {
            await Promise.all(
                cartProducts.map(async (cartProductObj) => {
                    return await deleteProductFromUser(cartProductObj.id);
                })
            );
        }

        const isProductReviews = await getReviewsByProductId(productId);
        if (isProductReviews) {
            const deletedReview = await deleteReview(productId);
        }

        const userProductsArr = await getUserProductsByProductId(productId);
        if (userProductsArr && userProductsArr.length) {
            await Promise.all(
                userProductsArr.map(async (userProductObj) => {
                    console.log("userProductObj is ", userProductObj);
                    const test = await deleteProductFromUser(userProductObj.id);
                    console.log("test is ", test);

                    return test;
                })
            );
        }

        const categoryProductsArr = await getCategoryProductsByProductId(
            productId
        );
        if (categoryProductsArr && categoryProductsArr.length) {
            await Promise.all(
                categoryProductsArr.map(async (categoryProductObj) => {
                    return await removeCategoryFromProduct(
                        categoryProductObj.id
                    );
                })
            );
        }

        const cartProductsArr = await getCartProductsByProductId(productId);
        if (cartProductsArr && cartProductsArr.length) {
            await Promise.all(
                cartProductsArr.map(async (cartProductObj) => {
                    return await removeProductFromCart(cartProductObj.id);
                })
            );
        }

        const {
            rows: [deletedProduct],
        } = await client.query(
            `
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `,
            [productId]
        );

        return deletedProduct;
    } catch (error) {
        console.error(
            `There's been an error deleting a product @ deleteProduct(productId) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all product objects in the products table
const getAllProducts = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * FROM products;
        `);

        return rows;
    } catch (error) {
        console.error(
            `There's been an error getting all products @ getAllProducts() in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Reutrns the product object of the product with the specified productId, if it exists
const getProductById = async (productId) => {
    try {
        const {
            rows: [product],
        } = await client.query(`
        SELECT * FROM products 
        WHERE id=${productId}
        `);

        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Cannot find product with that productId",
            };
        }

        return product;
    } catch (error) {
        console.error(
            `There's been an error getting a product by its ID @ getProductById(productId) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Returns the product object of the product with the specified name, if it exists
const getProductByName = async (productName) => {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
        SELECT * FROM products 
        WHERE name=$1
        `,
            [productName]
        );

        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Cannot find product with that product Name",
            };
        }

        return product;
    } catch (error) {
        console.error(
            `There's been an error getting a product by name @ getProductByName(productName) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all products associated with the user with the specified userId, if any
const getProductsByUserId = async (userId) => {
    try {
        const { rows } = await client.query(
            `
        SELECT * FROM products 
        WHERE "userId"=$1
        `,
            [userId]
        );

        return rows;
    } catch (error) {
        console.error(
            `There's been an error getting all products by userId @ getAllProductsByUserId(userId) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

// Sets active row for product of specified productId to false in products table
const deactivateProduct = async (productId) => {
    try {
        const userProductsArr = await getUserProductsByProductId(productId);
        if (userProductsArr && userProductsArr.length) {
            await Promise.all(
                userProductsArr.map(async (userProductObj) => {
                    return await deleteProductFromUser(userProductObj.id);
                })
            );
        }

        const categoryProductsArr = await getCategoryProductsByProductId(
            productId
        );
        if (categoryProductsArr && categoryProductsArr.length) {
            await Promise.all(
                categoryProductsArr.map(async (categoryProductObj) => {
                    return await removeCategoryFromProduct(
                        categoryProductObj.id
                    );
                })
            );
        }

        const cartProductsArr = await getCartProductsByProductId(productId);
        if (cartProductsArr && cartProductsArr.length) {
            await Promise.all(
                cartProductsArr.map(async (cartProductObj) => {
                    return await removeProductFromCart(cartProductObj.id);
                })
            );
        }

        const {
            rows: [deactivatedProduct],
        } = await client.query(
            `
            UPDATE products
            SET "active"=false
            WHERE id=$1
            RETURNING *;
        `,
            [productId]
        );

        return deactivatedProduct;
    } catch (error) {
        console.error(
            `There's been an error deactivating a product @ deactivateProduct(productId) in ./db/products.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsByUserId,
    updateProduct,
    deleteProduct,
    deactivateProduct,
};
