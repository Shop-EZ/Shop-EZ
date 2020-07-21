// ./src/components/drawers/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useContext, useState } from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

// Local Components
import SignUpAccordion from "./accordions/SignUpAccordion";
import LogInAccordion from "./accordions/LogInAccordion";
import LogOutAccordion from "./accordions/LogOutAccordion";
import SettingsAccordion from "./accordions/SettingsAccordion";

// Context
import { DrawerContext } from "../../DrawerContext";

// Styling
import variables from "../../styles";
const { drawerStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function AccountDrawer({ submit, setSubmit }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);

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
            open={drawer.accountLoggedOut}
            onClose={() => toggleDrawer("accountLoggedOut")}
            classes={{ paper: drawerPaper }}
        >
            <div className={blankSpaceAccount}></div>
            <div className={drawerContainer}>
                <div id="accountLoggedOut-drawer" className={wrapper}>
                    <List className={list}>
                        <SignUpAccordion
                            submit={submit}
                            setSubmit={setSubmit}
                        />
                        <LogInAccordion />
                        <SettingsAccordion />
                        <LogOutAccordion />
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default AccountDrawer;
