//  ./routes/carts.js

const express = require('express');
const cartsRouter = express.Router();
const { createCart, updateCart, deleteCart, getCartById, getCartByUserId } = require('../db/carts.js');
const { getProductById } = require('../db/products.js');
const { addProductToCart, removeProductFromCart, getCartProductById, getCartProductByCartAndProductId } = require('../db/cart_products.js');
const { requireUser } = require('../db/users.js');
const products = require('../db/products.js');


cartsRouter.use(async function( req, res, next ){
    console.log("A request has been made to the /api/carts endpoint.");
    next();
});


// Create Cart Route------------------------------WORKS!
// should add validation of req.body expected data
cartsRouter.post('/create', async function (req, res, next){
    const { userId, products } = req.body;
    const cartData = {};

    cartData.userId = userId;
    cartData.products = products;

    try {
        const newCart = await createCart(cartData);
        // should be an else... here; don't want server to hang
       if(newCart){
        res.send({ message:'Here is your cart...', cart: newCart});
       }
    } catch(error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//------------------------------Works!
cartsRouter.patch('/update/:cartId', async function (req, res, next){
    const { cartId } = req.params;
    const { products } = req.body;

    const cartData = {};
    cartData.products = products;

    try{
        const cart = await getCartById(cartId);

        const updatedCart = await updateCart( cart.id, cartData );

    // same for else here
    if(updatedCart){
        res.send({ message:'Your cart has been updated...', cart:updatedCart });
        }
    }catch(error){
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});


// Delete Cart Route-----Works!
cartsRouter.delete('/deletecart/:cartId', async function (req, res, next){
    const { cartId } = req.params;

    try{
        const cart = await getCartById(cartId);
        // make sure the cart exists first; or go straight to delete
        const deletedCart = await deleteCart(cart.id);
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart });
        }
    } catch(error){
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});


// Add Product to Cart Route------------------------------WORKS!
cartsRouter.put('/add/:productId', async function (req, res, next){
    const { productId } = req.params;
    const { cartId } = req.body;

    try {
        // make sure stock is available
        const newCartProduct = await addProductToCart(productId, cartId);
        // adjust stock after "purchasing"
        res.send( { message:'Product added to cart', product:newCartProduct });
    } catch(error){
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Remove Product From Cart Route-----WORKS!
cartsRouter.delete('/deletecartproduct/:productId', async function ( req, res, next){
    const { productId} = req.params;
    const { cartId } = req.body;

    try{
        const cartProduct = await getCartProductByCartAndProductId(cartId, productId);


        const deletedCartProduct = await removeProductFromCart(cartProduct.id);
      res.send({ message:'Product removed from cart.', product:deletedCartProduct });
    } catch(error){
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = cartsRouter;
