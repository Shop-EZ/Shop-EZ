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
        <>
            <div className={classes.storeContent}>
                <h2 className={classes.sectionTitle}>Astrology</h2>
                <ProductCard shopId="1" />
            </div>
            <div className={classes.storeContent}>
                <h2 className={classes.sectionTitle}>Tarot</h2>
                <ProductCard shopId="2" height="35rem" />
            </div>
            <div className={classes.storeContent}>
                <h2 className={classes.sectionTitle}>Crystals</h2>
                <ProductCard shopId="3" />
            </div>
        </>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default StoreContent;
