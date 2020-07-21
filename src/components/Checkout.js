// ./src/components/Checkout.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState } from "react";

// Material-UI
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import PaymentIcon from "@material-ui/icons/Payment";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListIcon from "@material-ui/icons/List";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

// Local Components
import CheckoutModal from "./CheckOutModal.js";

// Styling
import variables from "../styles";
const { checkoutStyling } = variables;

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(checkoutStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function Checkout({ setVisibility }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    //pass set visibility to checkout and checkout modal
    //from there set visiblity to false on close handler
    const [submit, setSubmit] = useState(false);

    const [expanded, setExpanded] = useState("");
    const [method, setMethod] = useState("");

    const [input, setInput] = useState({
        cardnumber: "",
        country: "",
        street: "",
        method: "",
        phone: "",
        first: "",
        state: "",
        last: "",
        city: "",
        zip: "",
        cvv: "",
        exp: "",
        delivery: null,
    });

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const classes = useStyles();

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/
    const handleInput = (key) => (event) => {
        setInput({ ...input, [key]: event.target.value });
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleRadioChange = (event) => {
        setInput({ ...input, ["delivery"]: event.target.value });
    };
    const methodChange = (event) => {
        setInput({ ...input, [method]: event.target.value });
        setMethod(event.target.value);
    };

    const handleSubmit = () => {
        event.stopPropagation();
        event.preventDefault();

        console.log("submitted");
        setSubmit(true);
        setInput({
            first: "",
            last: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            phone: "",
            method: "",
            cardnumber: "",
            cvv: "",
            exp: "",
            delivery: null,
        });
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    return (
        <div className={classes.wholeComponent}>
            <div className={`${classes.headerWrapper} ${classes.header}`}>
                <PaymentIcon /> <h1> Checkout </h1>{" "}
            </div>
            <h3 className={classes.header}>
                Please fill out these fields to complete your order:
            </h3>
            <form onSubmit={handleSubmit}>
                <Accordion
                    className={classes.checkoutAccordion}
                    square
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                >
                    <AccordionSummary
                        className={classes.accordionSummary}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <div className={classes.headerWrapper}>
                            <ListIcon />{" "}
                            <Typography className={classes.headerText}>
                                {" "}
                                Shipping
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <div>
                            <TextField
                                required
                                value={input.first}
                                onChange={handleInput("first")}
                                id="filled-basic"
                                label="First Name"
                                variant="filled"
                            />
                            <TextField
                                required
                                value={input.last}
                                onChange={handleInput("last")}
                                id="filled-basic"
                                label="Last Name "
                                variant="filled"
                            />
                            <br></br>
                            <TextField
                                required
                                value={input.street}
                                onChange={handleInput("street")}
                                id="filled-basic"
                                label="Street Address"
                                variant="filled"
                            />
                            <TextField
                                required
                                value={input.city}
                                onChange={handleInput("city")}
                                id="filled-basic"
                                label="City"
                                variant="filled"
                            />
                            <br></br>
                            <TextField
                                required
                                value={input.state}
                                onChange={handleInput("state")}
                                id="filled-basic"
                                inputProps={{ maxLength: 2 }}
                                label="State"
                                variant="filled"
                            />
                            <TextField
                                required
                                value={input.country}
                                onChange={handleInput("country")}
                                id="filled-basic"
                                label="Country"
                                variant="filled"
                            />
                            <br></br>
                            <TextField
                                required
                                value={input.zip}
                                onChange={handleInput("zip")}
                                id="filled-basic"
                                label="Zip"
                                inputProps={{ maxLength: 5 }}
                                variant="filled"
                            />
                            <TextField
                                required
                                value={input.phone}
                                onChange={handleInput("phone")}
                                inputProps={{ maxLength: 10 }}
                                id="filled-basic"
                                label="Phone"
                                variant="filled"
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    className={classes.checkoutAccordion}
                    square
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                >
                    <AccordionSummary
                        className={classes.accordionSummary}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <div className={classes.headerWrapper}>
                            <AttachMoneyIcon />{" "}
                            <Typography className={classes.headerText}>
                                {" "}
                                Payment Information{" "}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="method">Method</InputLabel>
                                <Select
                                    labelId="cards"
                                    value={method}
                                    onChange={(e) => {
                                        methodChange(e);
                                    }}
                                    variant="filled"
                                >
                                    <MenuItem value="Visa">Visa</MenuItem>
                                    <MenuItem value="Mastercard">
                                        MasterCard
                                    </MenuItem>
                                    <MenuItem value="American Express">
                                        American Express
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                value={input.cardnumber}
                                onChange={handleInput("cardnumber")}
                                id="filled-basic"
                                label="Credit Card Number"
                                variant="filled"
                                inputProps={{ maxLength: 19 }}
                            />
                            <TextField
                                required
                                value={input.cvv}
                                onChange={handleInput("cvv")}
                                id="filled-basic"
                                label="CVV Code "
                                variant="filled"
                                inputProps={{ maxLength: 4 }}
                            />
                            <TextField
                                required
                                value={input.exp}
                                onChange={handleInput("exp")}
                                id="filled-basic"
                                label="EXP"
                                variant="filled"
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    className={classes.checkoutAccordion}
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                >
                    <AccordionSummary
                        className={classes.accordionSummary}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <div className={classes.headerWrapper}>
                            {" "}
                            <FlightTakeoffIcon />{" "}
                            <Typography className={classes.headerText}>
                                {" "}
                                Delivery Options
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Delivery Options
                                </FormLabel>
                                <RadioGroup
                                    value={input.delivery}
                                    row
                                    aria-label="options"
                                    name="Delivery Options"
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel
                                        value="Ground"
                                        control={<Radio />}
                                        label="Ground"
                                    />
                                    <FormControlLabel
                                        value="Overnight"
                                        control={<Radio />}
                                        label="Overnight"
                                    />
                                    <FormControlLabel
                                        value="Other"
                                        control={<Radio />}
                                        label="Other"
                                    />
                                </RadioGroup>
                            </FormControl>{" "}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Container className={classes.completeButton}>
                    <Button
                        type="submit"
                        value="complete"
                        variant="outlined"
                        color="secondary"
                    >
                        Complete Order
                    </Button>
                    {submit ? (
                        <CheckoutModal
                            submit={submit}
                            setSubmit={setSubmit}
                            setVisibility={setVisibility}
                        />
                    ) : null}
                </Container>
            </form>
        </div>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default Checkout;
