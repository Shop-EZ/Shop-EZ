// ./src/components/drawers/accordions/cartAccordion/CartHeader.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React Components
import React from "react";

//Material-UI Components
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Styles
import variables from "../../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartHeader({ quantity, name, price, index }) {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        cartHeaderTitle,
        cartHeaderDiv,
        cartHeaderPrice,
        cartAccordion,
    } = classes;

    const totalPrice = Number(price) * Number(quantity);

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <AccordionSummary
            aria-controls={`panel${index}ah-content`}
            id={`panel${index}ah-header`}
            className={cartAccordion}
        >
            <div className={cartHeaderDiv}>
                <Typography
                    align="left"
                    variant="h3"
                    className={cartHeaderTitle}
                >
                    {`${quantity} x ${name}`}
                </Typography>

                <Typography
                    align="right"
                    variant="h4"
                    className={cartHeaderPrice}
                >
                    {/* If price is not already formatted as a decimal, add ".00" to it */}
                    {price}
                </Typography>
            </div>
        </AccordionSummary>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartHeader;
