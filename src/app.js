// ./src/app.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import ReactRouterDOM from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Material-UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Local Components
import AccountDrawer from "./components/drawers/AccountDrawer";
import CartDrawer from "./components/drawers/CartDrawer";
import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import SignUpModal from "./components/SignUpModal";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

// Context
import { DrawerContext } from "./DrawerContext";

// Styling
import variables from "./styles";
const { muiTheme } = variables;

// Other packages/modules
import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/
// Overrides Material-Ui Base Styling
const theme = createMuiTheme(muiTheme);
const App = () => {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [drawer, setDrawer] = useState({
        cart: false,
        accountLoggedOut: false,
        accountLoggedIn: false,
        explore: false,
        customizeShop: false,
    });
    const [visibility, setVisibility] = useState(false);
    const [submit, setSubmit] = useState(false);

    // Check if user is logged in and set their cart in state, else check if cart exists for non-user and set cart in state

    useEffect(() => {
        //   const isToken =  localStorage.getItem('token');
        //   const isCart = localStorage.getItem('cart') || (cart && cart.length);
        //   if(user && Object.keys(user).length){setCart(user.cart)}
        //   else if(isToken){
        //     // Check if token is valid and if it is, set user and then set cart
        //   }
        //   else if(isCart){
        //     // set cart
        //   }

        const getUserCart = async () => {
            try {
                const { data } = await axios.get("/api/users/cart/1");
                if (data.name === "UserCartObtained") {
                    setCart(data.userCart.products);
                }
                //TODO: Add else statements for if user is not logged in or we receive invalid user error or no cart error
            } catch (err) {
                console.error("Error retrieving initial user cart", err);
            }
        };

        getUserCart();
    }, []);

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/
    const toggleDrawer = (anchor) => {
        if (
            anchor === "accountLoggedOut" &&
            drawer[anchor] === false &&
            drawer.cart === true
        ) {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor], cart: false });
        } else if (
            anchor === "cart" &&
            drawer[anchor] === false &&
            drawer.accountLoggedOut === true
        ) {
            setDrawer({
                ...drawer,
                [anchor]: !drawer[anchor],
                accountLoggedOut: false,
            });
        } else {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor] });
        }
    };
    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <DrawerContext.Provider
                    value={{
                        setVisibility,
                        toggleDrawer,
                        visibility,
                        setDrawer,
                        setCart,
                        drawer,
                        cart,
                    }}
                >
                    <div id="app">
                        <Nav />
                        <CartDrawer />

                        <AccountDrawer submit={submit} setSubmit={setSubmit} />
                        {submit ? (
                            <SignUpModal
                                submit={submit}
                                setSubmit={setSubmit}
                            />
                        ) : null}

                        {visibility ? (
                            <Checkout setVisibility={setVisibility} />
                        ) : (
                            <>
                                <StoreHeader />
                                <StoreContent cart={cart} setCart={setCart} />
                            </>
                        )}
                        <Footer />
                    </div>
                </DrawerContext.Provider>
            </CssBaseline>
        </ThemeProvider>
    );
};
/*-------------------------------------------------------------- Render ------------------------------------------------------------------*/
const app = document.getElementById("root");
ReactDOM.render(<App />, app);
