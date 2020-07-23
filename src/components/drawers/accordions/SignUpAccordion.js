// ./src/components/drawers/accordions/SignUpAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React
import React, { useState, useContext } from "react";

// Material-UI Components
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";
import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Local Components
import PasswordInput from "./inputs/PasswordInput";
import BorderedInput from "./inputs/BoderedInput";
import SignUpModal from "../../SignUpModal";

// context
import { DrawerContext } from "../../../DrawerContext";

// Styling
import variables from "../../../styles";
const { accordionStyling } = variables;

// Other packages/modules
import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function SignUpAccordion({ submit, setSubmit }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);
    const [signUpValues, setSignUpValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        showPassword: false,
    });

    const { toggleDrawer } = useContext(DrawerContext);
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);

    const classes = useStyles();

    const {
        submit: submitStyle,
        accountAccordion,
        accountListItem,
        accordionRoot,
        headerTitle,
        form,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSignUp = async (e) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("handleSignUp here");

        try {
            const { data } = await axios.post("/api/users/register", {
                firstName: signUpValues.firstName,
                lastName: signUpValues.lastName,
                email: signUpValues.email,
                username: signUpValues.username,
                password: signUpValues.password,
                role: "user",
            });

            if (data.messageName === "UserAlreadyExists") {
                console.log("Username or Email Exists");
            } else if (data.messageName === "UserCreated") {
                console.log("It worked");
                localStorage.setItem("token", data.token);

                setSignUpValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                    showPassword: false,
                });
                setSubmit(true);
                toggleDrawer("account");
            } else {
                console.log("An error has occurred.");
            }
        } catch (err) {
            console.error(
                "Error signing up in user @handleSignUp in SignupAccordion.jsß",
                err
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={accountListItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panelSignUp`}
                onChange={handleChange(`panelSignUp`)}
                classes={{ root: accordionRoot }}
            >
                <AccordionSummary
                    aria-controls={`panelch-content`}
                    id={`panelch-header`}
                    className={accountAccordion}
                >
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Sign Up
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <form className={form} onSubmit={(e) => handleSignUp(e)}>
                        <BorderedInput
                            name="First Name"
                            first={true}
                            value={signUpValues.firstName}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["firstName"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="Last Name"
                            value={signUpValues.lastName}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["lastName"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="E-mail"
                            type="email"
                            value={signUpValues.email}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["email"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="Username"
                            value={signUpValues.username}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["username"]: e.target.value,
                                })
                            }
                        />
                        <PasswordInput
                            value={signUpValues.password}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["password"]: e.target.value,
                                })
                            }
                        />
                        <Container>
                            <Button
                                className={submitStyle}
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Container>
                    </form>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default SignUpAccordion;
