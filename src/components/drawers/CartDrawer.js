// ./src/components/drawers/CartDrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useContext } from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

// Local Components
import CartItemAccordion from "./accordions/cartAccordion/CartItemAccordion";
import CheckoutBtn from "./buttons/CheckoutBtn";

// Context
import { DrawerContext } from "../../DrawerContext";

// Styling
import variables from "../../styles";
const { drawerStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const testCart = [
    {
        id: 1,
        name: "Pet Rock",
        description: "A friendly rock found in Joshua Tree looking for a home",
        price: 300.99,
        quantity: 1,
        delivery: '{"pickup"}',
        rating: 5.0,
        userId: 3,
        categoryId: "{2, 3}",
    },
    {
        id: 2,
        name: "Turntables",
        description:
            "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
        price: 450.99,
        quantity: 2,
        delivery: '{"standard", "express", "next-day"}',
        rating: 3.5,
        userId: 4,
        categoryId: "{4}",
    },
    {
        id: 3,
        name: "Embroidered Dress",
        description:
            "One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!",
        price: 60.0,
        quantity: 50,
        delivery: '{"standard"}',
        rating: 5.0,
        userId: 2,
        categoryId: "{1}",
    },
];

function CartDrawer() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(drawerStyling);

    const classes = useStyles();

    const {
        drawer: drawerStyle,
        drawerContainer,
        blankSpaceCart,
        drawerPaper,
        wrapper,
    } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Drawer
            className={drawerStyle}
            anchor="right"
            open={drawer.cart}
            onClose={() => toggleDrawer("cart")}
            classes={{ paper: drawerPaper }}
        >
            <div className={blankSpaceCart}></div>
            <div className={drawerContainer}>
                <div id="cart-drawer" className={wrapper}>
                    <CheckoutBtn />
                    <List>
                        {testCart.map((productObj, index) => (
                            <CartItemAccordion
                                productObj={productObj}
                                index={index}
                                key={index}
                            />
                        ))}
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------ */

export default CartDrawer;
