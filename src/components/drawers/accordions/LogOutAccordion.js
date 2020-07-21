// ./src/components/drawers/accordions/LogOutAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React from "react";

// Material-UI Components
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

// Styling
import variables from "../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function LogOutAccordion() {
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
        console.log("logging out...");
        localStorage.setItem("token", "");
        console.log("finished logging out");
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
