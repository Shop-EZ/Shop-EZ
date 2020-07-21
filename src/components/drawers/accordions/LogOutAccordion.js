// ./src/components/drawers/accordions/LogOutAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useContext } from "react";

// Material-UI Components
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

// Context
import { DrawerContext } from "../../../DrawerContext";
import { UserContext } from "../../../UserContext";

// Styling
import variables from "../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function LogOutAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { setAlert, toggleDrawer } = useContext(DrawerContext);
    const { setToken, setCart, setUser } = useContext(UserContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        accountAccordion,
        accountListItem,
        accordionRoot,
        headerTitle,
        logOut,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleLogOut = () => {
        localStorage.setItem("token", "");
        setToken("");
        setAlert({
            message: "You have successfully logged out",
            severity: "success",
            isVisible: true,
        });
        toggleDrawer("account");
        setUser({
            id: "",
            username: "",
            firstName: "",
            lastName: "",
        });
        setCart([]);
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={accountListItem}>
            <Accordion classes={{ root: accordionRoot }}>
                <AccordionSummary
                    aria-controls={`paneleh-content`}
                    id={`paneleh-header`}
                    className={`${accountAccordion} ${logOut}`}
                    onClick={handleLogOut}
                >
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Log Out
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LogOutAccordion;
