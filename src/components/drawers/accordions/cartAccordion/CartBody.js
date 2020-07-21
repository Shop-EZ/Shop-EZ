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
import { UserContext } from "../../../../UserContext";

// Styles
import variables from "../../../../styles";
import axios from "axios";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartBody({ quantity, price, productId }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { cart, setCart } = useContext(UserContext);
    const [qty, setQty] = useState(quantity);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        cartAccordionDetails,
        priceContainer,
        productImage,
        productInfo,
        qtyContainer,
        priceAmount,
        priceLabel,
        qtyCount,
        qty: qtStyle,
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

            console.log("updated quantity should be ", data.qtyDesired);

            const newCart = cart.map((cartProduct) => {
                if (+cartProduct.id === +productId) {
                    return { ...cartProduct, ["quantity"]: data.qtyDesired };
                } else {
                    return cartProduct;
                }
            });

            console.log("newCart is ", newCart);
            setCart(newCart);
        } catch (error) {
            console.error(
                "There's been an error incrementing/decrementing cart product in CartBody.js @ handleIncrement?()",
                error
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    console.log("cart is ", cart);
    return (
        <AccordionDetails className={cartAccordionDetails}>
            <img
                className={productImage}
                src="/assets/placeholder_product.png"
                alt="A generic placeholder image of an outline of sunglasses"
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
                <RemoveBtn />
            </div>
        </AccordionDetails>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartBody;
