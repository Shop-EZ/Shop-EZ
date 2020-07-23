// ./src/components/Checkout.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState, useContext } from "react";

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
import Input from "@material-ui/core/Input";

// Local Components
import CheckoutModal from "./CheckOutModal.js";

// Context
import { UserContext } from "../UserContext";
import { DrawerContext } from "../DrawerContext";

// Styling
import variables from "../styles";
import { format } from "morgan";
const { checkoutStyling } = variables;

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(checkoutStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function Checkout({ setVisibility }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [shippingCost, setShippingCosts] = useState(2.99);
    const [expanded, setExpanded] = useState(false);
    const [submit, setSubmit] = useState(false);
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

    const { setAlert } = useContext(DrawerContext);
    const { priceFormatFns } = useContext(UserContext);
    const { calculateSubtotal, formatPrice } = priceFormatFns;

    let itemTotal = calculateSubtotal();
    let subTotal = itemTotal + shippingCost;
    let taxPrice = itemTotal * 0.08;
    let processingFee = itemTotal * 0.02;
    let grandTotal =
        itemTotal + subTotal + taxPrice + processingFee + shippingCost;

    processingFee = formatPrice(processingFee);
    grandTotal = formatPrice(grandTotal);
    itemTotal = formatPrice(itemTotal);
    subTotal = formatPrice(subTotal);
    taxPrice = formatPrice(taxPrice);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const classes = useStyles();

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/
    const handleInput = (key) => (event) => {
        setInput({ ...input, [key]: event.target.value });
    };

    const handleChange = (panel) => (event, newExpanded) => {
        console.log("event is ", event);
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

    const handleError = () => {
        setAlert({
            message: "Please fill out all the required fields to continue",
            severity: "error",
            isVisible: true,
        });
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    return (
        <div className={classes.wholeComponent}>
            <div className={`${classes.headerWrapper} ${classes.header}`}>
                <PaymentIcon className={classes.paymentIcon} />
                <h1> Checkout </h1>
            </div>
            <h3 className={classes.header}>
                Please fill out these fields to complete your order:
            </h3>
            <form
                onSubmit={handleSubmit}
                onError={handleError}
                className={classes.checkoutForm}
            >
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
                        classes={{ content: classes.accordionSummaryContent }}
                    >
                        <div className={classes.headerWrapper}>
                            <ListIcon className={classes.listIcon} />
                            <Typography className={classes.headerText}>
                                Shipping
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <div>
                            <TextField
                                className={classes.inputBoxLeft}
                                onChange={handleInput("first")}
                                value={input.first}
                                label="First Name"
                                id="filled-basic"
                                variant="filled"
                                required
                            />
                            <TextField
                                className={classes.inputBoxRight}
                                onChange={handleInput("last")}
                                value={input.last}
                                id="filled-basic"
                                label="Last Name"
                                variant="filled"
                                required
                            />
                            <br></br>
                            <TextField
                                onChange={handleInput("street")}
                                className={classes.inputBoxLeft}
                                value={input.street}
                                label="Street Address"
                                id="filled-basic"
                                variant="filled"
                                required
                            />
                            <TextField
                                className={classes.inputBoxRight}
                                onChange={handleInput("city")}
                                value={input.city}
                                id="filled-basic"
                                variant="filled"
                                label="City"
                                required
                            />
                            <br></br>
                            <TextField
                                className={classes.inputBoxLeft}
                                onChange={handleInput("state")}
                                inputProps={{ maxLength: 2 }}
                                value={input.state}
                                id="filled-basic"
                                variant="filled"
                                label="State"
                                required
                            />
                            <TextField
                                className={classes.inputBoxRight}
                                onChange={handleInput("country")}
                                value={input.country}
                                id="filled-basic"
                                variant="filled"
                                label="Country"
                                required
                            />
                            <br></br>
                            <TextField
                                className={classes.inputBoxLeft}
                                onChange={handleInput("zip")}
                                inputProps={{ maxLength: 5 }}
                                value={input.zip}
                                id="filled-basic"
                                variant="filled"
                                label="Zip"
                                required
                            />
                            <TextField
                                className={classes.inputBoxRight}
                                onChange={handleInput("phone")}
                                inputProps={{ maxLength: 10 }}
                                value={input.phone}
                                id="filled-basic"
                                variant="filled"
                                label="Phone"
                                required
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
                        classes={{ content: classes.accordionSummaryContent }}
                    >
                        <div className={classes.headerWrapper}>
                            <AttachMoneyIcon className={classes.moneyIcon} />
                            <Typography className={classes.headerText}>
                                Payment Information
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    id="method"
                                    className={classes.inputLabel}
                                >
                                    Card Type
                                </InputLabel>
                                <Select
                                    labelId="cards"
                                    value={method}
                                    onChange={(e) => {
                                        methodChange(e);
                                    }}
                                    variant="filled"
                                    className={classes.dropDown}
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
                                className={classes.paymentInput}
                            />
                            <TextField
                                required
                                value={input.cvv}
                                onChange={handleInput("cvv")}
                                id="filled-basic"
                                label="CVV Code "
                                variant="filled"
                                inputProps={{ maxLength: 4 }}
                                className={classes.paymentInput}
                            />
                            <TextField
                                required
                                value={input.exp}
                                onChange={handleInput("exp")}
                                className={classes.paymentInput}
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
                        classes={{ content: classes.accordionSummaryContent }}
                    >
                        <div className={classes.headerWrapper}>
                            <FlightTakeoffIcon className={classes.flightIcon} />
                            <Typography className={classes.headerText}>
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
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel
                                        value="Ground"
                                        control={<Radio />}
                                        label="Ground"
                                        className={classes.radio}
                                    />
                                    <FormControlLabel
                                        value="Overnight"
                                        control={<Radio />}
                                        label="Overnight"
                                        className={classes.radio}
                                    />
                                    <FormControlLabel
                                        value="Other"
                                        control={<Radio />}
                                        label="Other"
                                        className={classes.radio}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </AccordionDetails>
                </Accordion>
                {itemTotal !== "$undefined" ? (
                    <div className={classes.orderSummary}>
                        <Typography className={classes.orderSummaryHeader}>
                            Order Summary
                        </Typography>
                        <div className={classes.summaryLineItem}>
                            <Typography>Cart Items</Typography>
                            <Typography>{itemTotal}</Typography>
                        </div>
                        <div className={classes.summaryLineItem}>
                            <Typography>Shipping</Typography>
                            <Typography>{formatPrice(shippingCost)}</Typography>
                        </div>
                        <div className={classes.summaryLineItem}>
                            <Typography>Sub-Total</Typography>
                            <Typography>{subTotal}</Typography>
                        </div>
                        <div className={classes.summaryLineItem}>
                            <Typography>Tax</Typography>
                            <Typography>{taxPrice}</Typography>
                        </div>
                        <div className={classes.summaryLineItem}>
                            <Typography className={classes.processingFee}>
                                Processing Fee
                            </Typography>
                            <Typography>{processingFee}</Typography>
                        </div>
                        <div className={classes.summaryLineItem}>
                            <Typography className={classes.grandTotalHeader}>
                                Total
                            </Typography>
                            <Typography className={classes.grandTotalAmount}>
                                {grandTotal}
                            </Typography>
                        </div>
                    </div>
                ) : (
                    <Typography className={classes.cartEmpty}>
                        Cart is empty. Add products to your cart, and come back
                        to visit!
                    </Typography>
                )}
                <div className={classes.buttonContainer}>
                    <Button
                        className={classes.buttonsStyle}
                        variant="contained"
                        color="secondary"
                        value="cancel"
                        onClick={() => setVisibility(false)}
                    >
                        Back to Shopping
                    </Button>

                    <Button
                        className={classes.buttonsStyle}
                        variant="contained"
                        color="secondary"
                        value="complete"
                        type="submit"
                    >
                        Complete Order
                    </Button>
                </div>
                {submit ? (
                    <Container className={classes.checkoutModalStyle}>
                        <CheckoutModal
                            setVisibility={setVisibility}
                            setSubmit={setSubmit}
                            submit={submit}
                        />
                    </Container>
                ) : null}
            </form>
        </div>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default Checkout;
