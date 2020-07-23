// ./src/components/drawers/accordions/cartAccordion/CartBody.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React Components
import React, { useState, useContext } from "react";

//Material-UI Components
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Local Components
import RemoveBtn from "../../buttons/RemoveBtn";

// context
import { DrawerContext } from "../../../../DrawerContext";
import { UserContext } from "../../../../UserContext";

// Styles
import variables from "../../../../styles";
import axios from "axios";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartBody({ qtyDesired, price, productId, cartProductId, image }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { cart, setCart } = useContext(UserContext);
    const { setAlert } = useContext(DrawerContext);
    const [qty, setQty] = useState(qtyDesired);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        cartAccordionDetails,
        priceContainer,
        qty: qtStyle,
        productImage,
        qtyContainer,
        productInfo,
        priceAmount,
        priceLabel,
        qtyCount,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleIncrement = async (e) => {
        const newQty = e.target.value;
        setQty(e.target.value);

        try {
            const { data } = await axios.put(
                `/api/carts/CartProducts/${productId}`,
                {
                    qtyDesired: newQty,
                }
            );

            const newCart = cart.map((cartProduct) => {
                if (+cartProduct.id === +productId) {
                    return { ...cartProduct, ["qtyDesired"]: data.qtyDesired };
                } else {
                    return cartProduct;
                }
            });

            setCart(newCart);
        } catch (error) {
            console.error(
                "There's been an error incrementing/decrementing cart product in CartBody.js @ handleIncrement(e)",
                error
            );
        }
    };

    const handleRemove = async (e) => {
        try {
            console.log("cartProductId is ", cartProductId);
            const { data } = await axios.delete(
                `/api/carts/deleteCartProduct/${cartProductId}`
            );

            if (data.name === "RemoveCartProductSuccess") {
                let newCart = cart
                    .map((cartProduct) => {
                        if (+cartProduct.cartProductId !== +cartProductId) {
                            return cartProduct;
                        }
                    })
                    .filter((cartItem) => cartItem !== undefined);

                setCart(newCart);
                setAlert({
                    message:
                        "Product has been successfully removed from your cart",
                    severity: "success",
                    isVisible: true,
                });
            } else if (data.name === "CartProductNotFoundError") {
                setAlert({
                    message:
                        "There's been an error removing this product from your cart",
                    severity: "error",
                    isVisible: true,
                });
            } else {
                setAlert({
                    message: "An unknown error occurred",
                    severity: "error",
                    isVisible: true,
                });
            }
        } catch (error) {
            console.error(
                "There's been an error removing product from cart in CartBody.js @ handleRemove(e)",
                error
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <AccordionDetails className={cartAccordionDetails}>
            <img
                className={productImage}
                src={image}
                alt="A placeholder image"
            />
            <div className={productInfo}>
                <div className={priceContainer}>
                    <Typography
                        className={priceLabel}
                        align="left"
                        variant="h4"
                    >
                        Item Price:
                    </Typography>
                    <Typography
                        className={priceAmount}
                        align="left"
                        variant="h4"
                    >
                        {price}
                    </Typography>
                </div>
                <div className={qtyContainer}>
                    <Typography className={qtStyle} align="left" variant="h4">
                        Qty:
                    </Typography>

                    <input
                        className={qtyCount}
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => handleIncrement(e)}
                    ></input>
                </div>
                <RemoveBtn onClick={handleRemove} />
            </div>
        </AccordionDetails>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartBody;
