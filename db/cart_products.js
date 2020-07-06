// ./db/cart_products.js


/* ------------ Reference ------------*/


// id SERIAL PRIMARY KEY,
// "cartId" INTEGER REFERENCES carts(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");
const { getProductById } = require("./products");


/*---------------------------------- Functions ---------------------------------------*/


// Adds productId's to cartId's in cart_products table
const addProductToCart = async (productId, cartId) => {

    try{

        const isProduct = await getProductById(productId);

        if(isProduct){
            const { rows: [ newCartProduct ] } = await client.query(`
                INSERT INTO cart_products
                ("productId", "cartId")
                VALUES ($1, $2)
                RETURNING *
            `, [productId, cartId])

            return newCartProduct;
        }
        else{
            throw { 
                name: "ProductNotFoundError",
                message: "Cannot find product with that productId"
            }
        }
    }
    catch(error){
        console.error(`There's been an error adding a product to a cart @ addProductToCart(productId, cartId) in ./db/cart_products.js. ${ error }`)
        throw error;
    }

}


// Removes productId's from cartId's in cart_products table
const removeProductFromCart = async (cartProductId) => {

    try{

        const isCartProduct = await getCartProductById(cartProductId);

        if(isCartProduct){
            const { rows: [ deletedCartProduct ] } = await client.query(`
                DELETE FROM cart_products
                WHERE id=$1
                RETURNING *;
            `, [cartProductId]);

            return deletedCartProduct;
        }
        else{
            throw({
                name: "CartProductNotFoundError",
                message: "Cannot find cartProduct with that cartProductId"
            })
        }
    }
    catch(error){
        console.error(`There's been an error removing a product from a cart @ removeProductFromCart(cartProductId) in ./db/cart_products.js. ${ error }`)
        throw error;
    }

}


// Returns single cart product object from cart_products table
const getCartProductById = async (cartProductId) => {
    
    try{
        
        const { rows: [ cartProduct ] } = await client.query(`
            SELECT * FROM cart_products
            WHERE id=$1;
        `, [cartProductId]);

        return cartProduct;
    }
    catch(error){
        console.error(`There's been an error getting cart product by id @ getCartProductById(cartProductId) in ./db/cart_products.js. ${ error }`)
        throw error;
    }
}


// Returns an array of product ids for all products associated with the specified cartId
const getProductsByCartId = async (cartId) => {

    try{
        
        const {rows: cartProducts } = await client.query(`
            SELECT * FROM cart_products
            WHERE "cartId"=($1);
        `, [cartId]);

        return cartProducts;
        
    }
    catch(error){
        console.error(`There's been an error getting products by cart id @ getProductsByCartId(cartId) in ./db/cart_products.js. ${ error }`)
        throw error;
    }

}


/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getProductsByCartId
}