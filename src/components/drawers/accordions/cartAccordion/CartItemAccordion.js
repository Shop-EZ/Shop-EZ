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

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const { accordionRoot, cartListItem } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleLogOut = () => {
        console.log("logging out...");
        localStorage.setItem("token", "");
        console.log("finished logging out");
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem component="div" key={productObj.id} className={cartListItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                classes={{ root: accordionRoot }}
            >
                <CartHeader
                    quantity={productObj.quantity}
                    name={productObj.name}
                    price={productObj.price}
                    index={index}
                />

                <CartBody quantity={productObj.quantity} />
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartItemAccordion;
