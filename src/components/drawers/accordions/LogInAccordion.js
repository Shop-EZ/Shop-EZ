// ./src/components/accordions/LogInAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

import BorderedInput from "./inputs/BoderedInput";
import PasswordInput from "./Inputs/PasswordInput";
import variables from "../../../styles";
const { accordionStyling } = variables;

import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function LogInAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);
    const [loggedInValues, setLoggedInValues] = useState({
        username: "",
        password: "",
    });

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        accordionRoot,
        headerTitle,
        accordion,
        submit,
        form,
        listItem,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleLogIn = async (e) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("handlelogin here");

        try {
            const { data } = await axios.post("/api/users/login", {
                username: loggedInValues.username,
                password: loggedInValues.password,
            });

            if (
                data.messageName === "IncorrectCredentials" ||
                data.name === "UserNotFoundError"
            ) {
                console.log("incorrect credentials inputted");
            } else if (data.messageName === "Success") {
                localStorage.setItem("token", data.token);
            } else {
                console.log("An error has occurred.");
            }
        } catch (err) {
            console.error(
                "Error logging in user @handleLogin in LoginAccordion.jsß",
                err
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={listItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panelLogIn`}
                onChange={handleChange(`panelLogIn`)}
                classes={{ root: accordionRoot }}
            >
                <AccordionSummary
                    aria-controls={`panelbh-content`}
                    id={`panelbh-header`}
                    className={accordion}
                >
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Log In
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <form className={form} onSubmit={(e) => handleLogIn(e)}>
                        <BorderedInput
                            name="Username"
                            first={true}
                            value={loggedInValues.username}
                            onChange={(e) =>
                                setLoggedInValues({
                                    ...loggedInValues,
                                    ["username"]: e.target.value,
                                })
                            }
                        />
                        <PasswordInput
                            value={loggedInValues.password}
                            onChange={(e) =>
                                setLoggedInValues({
                                    ...loggedInValues,
                                    ["password"]: e.target.value,
                                })
                            }
                        />

                        <Button
                            className={submit}
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Log In
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LogInAccordion;
