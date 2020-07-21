// ./src/components/drawers/buttons/CheckoutBtn.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState, useContext } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import PaymentIcon from "@material-ui/icons/Payment";
import Button from "@material-ui/core/Button";

// Context
import { DrawerContext } from "../../../DrawerContext";

// Styling
import variables from "../../../styles";
const { checkOutBtnStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CheckoutBtn() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { setVisibility, toggleDrawer } = useContext(DrawerContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(checkOutBtnStyling);
    const classes = useStyles();
    const { checkout } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Button
            variant="contained"
            color="secondary"
            classes={{
                containedSecondary: checkout,
            }}
            startIcon={<PaymentIcon />}
            onClick={() => {
                setVisibility(true);
                toggleDrawer("cart");
            }}
        >
            Checkout
        </Button>
    );
}

export default CheckoutBtn;
