// ./src/components/drawers/accordions/OrdersAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState } from "react";

// Material-UI Components
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

// Styling
import variables from "../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function OrdersAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        accountAccordion,
        accountListItem,
        accordionRoot,
        headerTitle,
        comingSoon,
        settings,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={accountListItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panelSettings`}
                onChange={handleChange(`panelSettings`)}
                classes={{ root: accordionRoot }}
            >
                <AccordionSummary
                    aria-controls={`paneleh-content`}
                    id={`paneleh-header`}
                    className={accountAccordion}
                >
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Orders
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <div className={settings}>
                        <p className={comingSoon}>Coming Soon!</p>
                    </div>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default OrdersAccordion;
