// ./src/components/drawers/accordions/cartAccordion/CartItemAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React Components
import React, { useState, useContext } from "react";

//Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

// Local Components
import CartHeader from "./CartHeader";
import CartBody from "./CartBody";

// Context
import { UserContext } from "../../../../UserContext";

// Styles
import variables from "../../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartItemAccordion({ productObj }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { priceFormatFns } = useContext(UserContext);
    const [expanded, setExpanded] = useState(false);

    const { formatPrice } = priceFormatFns;

    const {
        id: productId,
        cartProductId,
        qtyDesired,
        image,
        price,
        name,
    } = productObj;

    const formattedPrice = {
        totalPrice: "",
        itemPrice: "",
    };

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const { accordionRoot, cartListItem } = classes;

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

    // Formats unit price and total item price and incudes dollar symbol
    function formatPriceAndTotal(num, quantity) {
        const totalPrice = +quantity * +num;
        formattedPrice.itemPrice = formatPrice(num);
        formattedPrice.totalPrice = formatPrice(totalPrice);
    }

    formatPriceAndTotal(price, qtyDesired);
    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                    qtyDesired={qtyDesired}
                    index={productId}
                    price={formattedPrice.totalPrice}
                    name={name}
                />

                <CartBody
                    qtyDesired={qtyDesired}
                    price={formattedPrice.itemPrice}
                    productId={productId}
                    cartProductId={cartProductId}
                    image={image}
                />
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartItemAccordion;
