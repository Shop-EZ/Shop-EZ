// ./src/components/drawers/accordions/cartAccordion/CartItemAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React Components
import React, { useState } from "react";

//Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

// Local Components
import CartHeader from "./CartHeader";
import CartBody from "./CartBody";

// Styles
import variables from "../../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartItemAccordion({ productObj, index }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { name, price, quantity, id: productId } = productObj;
    const formattedPrice = {
        itemPrice: "",
        totalPrice: "",
    };

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const { accordionRoot, cartListItem } = classes;

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

    // Adds commas in the proper thousandth places
    function formatNumberWithCommas(num) {
        // If number provided is neither of type string or number, return early
        if (typeof num !== "number" && typeof num !== "string") return;
        const parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    // Converts numbers to numbers with a float of 2
    function formatNumberWithDecial(num) {
        // If number provided is neither of type string or number, return early
        if (typeof num !== "number" && typeof num !== "string") return;

        console.log(
            "+num is ",
            +num,
            "math.floor(+num) is ",
            Math.floor(+num),
            "and +num === Math.floor(+num) evaluates to ",
            +num === Math.floor(+num)
        );
        if (+num === Math.floor(+num)) {
            return `${num}.00`;
        } else {
            return Number(num).toFixed(2);
        }
    }

    function formatPrice(num, quantity) {
        const totalPrice = +quantity * +num;
        formattedPrice.itemPrice =
            "$" + formatNumberWithCommas(formatNumberWithDecial(num));
        formattedPrice.totalPrice =
            "$" + formatNumberWithCommas(formatNumberWithDecial(totalPrice));
    }

    formatPrice(price, quantity);

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem component="div" key={productObj.id} className={cartListItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panel${productId}`}
                onChange={handleChange(`panel${productId}`)}
                classes={{ root: accordionRoot }}
            >
                <CartHeader
                    quantity={quantity}
                    index={productId}
                    price={formattedPrice.totalPrice}
                    name={name}
                />

                <CartBody
                    quantity={quantity}
                    price={formattedPrice.itemPrice}
                    productId={productId}
                />
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartItemAccordion;
