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
import { UserContext } from "../../UserContext";

// Styling
import variables from "../../styles";
import { ListItem, Typography } from "@material-ui/core";
const { drawerStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartDrawer() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { cart, subTotal } = useContext(UserContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(drawerStyling);

    const classes = useStyles();

    const {
        subTotal: subTotalStyling,
        drawer: drawerStyle,
        drawerContainer,
        blankSpaceCart,
        subTotalAmount,
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
                        {cart.map((productObj) => (
                            <CartItemAccordion
                                productObj={productObj}
                                key={productObj.id}
                            />
                        ))}
                        {subTotal !== "$undefined" ? (
                            <ListItem>
                                <div className={subTotalStyling}>
                                    <Typography>Sub-Total:</Typography>
                                    <Typography className={subTotalAmount}>
                                        {subTotal}
                                    </Typography>
                                </div>
                            </ListItem>
                        ) : null}
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------ */

export default CartDrawer;
