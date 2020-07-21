// ./src/components/StoreContent.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React

import React from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";

// Local Components
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";

// Styling
import variables from "../styles";
const { storeContentStyling } = variables;

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(storeContentStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function StoreContent({ cart, setCart }) {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/
    const classes = useStyles();

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    return (
        <Grid className={classes.storeContent}>
            <ProductCard cart={cart} setCart={setCart} />
            {/* <ProductView /> */}
        </Grid>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default StoreContent;
