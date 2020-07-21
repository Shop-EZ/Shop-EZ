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
import Notice from "./components/Notice";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

// Context
import { DrawerContext } from "./DrawerContext";
import { UserContext } from "./UserContext";

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
    const [user, setUser] = useState({
        id: "",
        username: "",
        firstName: "",
        lastName: "",
    });
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState("");
    const [drawer, setDrawer] = useState({
        cart: false,
        account: false,
        explore: false,
        customizeShop: false,
    });
    const [alert, setAlert] = useState({
        message: "",
        severity: "",
        isVisible: false,
    });
    const [visibility, setVisibility] = useState(false);
    const [submit, setSubmit] = useState(false);

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

    // Get user cart products and sets cart state; if no products found for cart or no cart found, set cart to an empty array
    const getUserCart = async (userId) => {
        const { data: cartData } = await axios.get(`/api/users/cart/${userId}`);
        if (cartData && cartData.name === "UserCartObtained") {
            const { id: cartId } = cartData.userCart;
            getCartProducts(cartId);
        } else {
            setCart([]);
        }
    };

    // Gets cart products and dets cart state; if no product found, set cart to an empty array
    const getCartProducts = async (cartId) => {
        const token = localStorage.getItem("token");
        const { data: productData } = await axios.get(
            `/api/carts/cartProducts/${cartId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (productData.name === "CartProductsRetrieved") {
            setCart(productData.cartProductsArr);
        } else if (productData.name === "NoProductsFound") {
            setCart([]);
        }
    };

    // Check if user is logged in and set their cart in state, else check if cart exists for non-user and set cart in state

    /*-------------------------------------------------------------- Initial Render ------------------------------------------------------------------*/

    useEffect(
        () => {
            // Check if there is a token in state. If not, check local storage.
            let isToken = Boolean(token);
            let tempToken = token;
            if (!isToken) {
                isToken = Boolean(localStorage.getItem("token"));
                if (!isToken) {
                    isToken = false;
                } else {
                    tempToken = localStorage.getItem("token");
                }
            }

            try {
                // If there's a token in state or local storage, verify it and re-set it into local storage and state and set user, else, if token can't be verified, clear it from state and local storage
                // If token cannot be verified or there is no stored token, establish session and assign a UUID
                if (isToken) {
                    const verifyToken = async () => {
                        const { data } = await axios.post("/api/users/token", {
                            token: tempToken,
                        });

                        if (data.name === "TokenNotVerified") {
                            setToken("");
                            localStorage.setItem("token", "");
                        } else if (data.name === "TokenVerified") {
                            setToken(tempToken);
                            localStorage.setItem("token", tempToken);
                            const {
                                firstName,
                                lastName,
                                username,
                                id,
                            } = data.decodedToken;

                            setUser({
                                id,
                                username,
                                firstName,
                                lastName,
                            });

                            getUserCart(id);
                        } else {
                            throw new Error(
                                "There's been an error verifying token on render startup in app.js @ useEffect"
                            );
                        }
                    };
                    verifyToken();
                } else {
                    console.log("no token");
                }
            } catch (err) {
                console.error("Error retrieving initial user cart", err);
                const { name, message } = err;
            }
        },

        // getUserCart();
        []
    );

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/
    const toggleDrawer = (anchor) => {
        if (
            anchor === "account" &&
            drawer[anchor] === false &&
            drawer.cart === true
        ) {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor], cart: false });
        } else if (
            anchor === "cart" &&
            drawer[anchor] === false &&
            drawer.account === true
        ) {
            setDrawer({
                ...drawer,
                [anchor]: !drawer[anchor],
                account: false,
            });
        } else {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor] });
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({ ...alert, ["isVisible"]: false });
    };
    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <UserContext.Provider
                    value={{
                        getCartProducts,
                        getUserCart,
                        setToken,
                        setUser,
                        setCart,
                        token,
                        user,
                        cart,
                    }}
                >
                    <DrawerContext.Provider
                        value={{
                            setVisibility,
                            toggleDrawer,
                            visibility,
                            setDrawer,
                            setAlert,
                            drawer,
                            alert,
                        }}
                    >
                        <div id="app">
                            <Nav />
                            <CartDrawer />

                            <AccountDrawer
                                submit={submit}
                                setSubmit={setSubmit}
                            />
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
                                    <StoreContent
                                        cart={cart}
                                        setCart={setCart}
                                    />
                                </>
                            )}
                            <Notice
                                isVisible={alert.isVisible}
                                message={alert.message}
                                severity={alert.severity}
                                handleClose={handleClose}
                            />
                            <Footer />
                        </div>
                    </DrawerContext.Provider>
                </UserContext.Provider>
            </CssBaseline>
        </ThemeProvider>
    );
};
/*-------------------------------------------------------------- Render ------------------------------------------------------------------*/
const app = document.getElementById("root");
ReactDOM.render(<App />, app);
