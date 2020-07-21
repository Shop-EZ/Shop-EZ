// ./src/components/drawers/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useContext, useState } from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

// Local Components
import SettingsAccordion from "./accordions/SettingsAccordion";
import ProfileAccordion from "./accordions/ProfileAccordion";
import OrdersAccordion from "./accordions/OrdersAccordion";
import LogOutAccordion from "./accordions/LogOutAccordion";
import SignUpAccordion from "./accordions/SignUpAccordion";
import LogInAccordion from "./accordions/LogInAccordion";
import StoreAccordion from "./accordions/StoreAccordion";

// Context
import { DrawerContext } from "../../DrawerContext";
import { UserContext } from "../../UserContext";

// Styling
import variables from "../../styles";
const { drawerStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function AccountDrawer({ submit, setSubmit }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { user } = useContext(UserContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(drawerStyling);

    const classes = useStyles();

    const {
        drawer: drawerStyle,
        blankSpaceAccount,
        drawerContainer,
        drawerPaper,
        wrapper,
        list,
    } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Drawer
            className={drawerStyle}
            anchor="right"
            open={drawer.account}
            onClose={() => toggleDrawer("account")}
            classes={{ paper: drawerPaper }}
        >
            <div className={blankSpaceAccount}></div>
            <div className={drawerContainer}>
                <div id="account-drawer" className={wrapper}>
                    <List className={list}>
                        {user.id ? (
                            <>
                                <OrdersAccordion />
                                <StoreAccordion />
                                <ProfileAccordion />
                                <SettingsAccordion />
                                <LogOutAccordion />
                            </>
                        ) : (
                            <>
                                <SignUpAccordion
                                    submit={submit}
                                    setSubmit={setSubmit}
                                />
                                <LogInAccordion />
                                <SettingsAccordion />
                            </>
                        )}
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default AccountDrawer;
