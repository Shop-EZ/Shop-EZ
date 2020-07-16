import React,{ useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PaymentIcon from '@material-ui/icons/Payment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


//STYLES
const useStyles = makeStyles({
    header:{
      marginRight: 150,
      marginLeft: 150,
      textAlign: "center", 
      textDecoration:""
    },
    checkoutAccordion:{
      textAlign:"center",
      marginRight: 150,
      marginLeft: 150,
      padding: 30,
      background: "white"
    },
    formControl:{
      margin: 1,
      minWidth: 120,
    },
    selectEmpty:{
      marginTop: 2,
    },
    completeButton:{
      textAlign: "center",
    }
  
});
// COMPONENT
function Checkout () {
  const [expanded, setExpanded] = useState('');
  const [method, setMethod] = useState('')
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const methodChange = (event) => {
    setMethod(event.target.value);
  };

  return (
  
    <div>
      <h1 className={classes.header}>Checkout <PaymentIcon></PaymentIcon></h1>
      <h3 className={classes.header}>Please fill out these fields to complete your order:</h3>
      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
          <form noValidate autoComplete="off">
          <TextField id="filled-basic" label="First Name" variant="filled" />
          <TextField id="filled-basic" label="Last Name " variant="filled" />
          <br></br>
          <TextField id="filled-basic" label="Street Address" variant="filled" />
          <TextField id="filled-basic" label="City" variant="filled" />
          <br></br>
          <TextField id="filled-basic" label="State" variant="filled" />
          <TextField id="filled-basic" label="Country" variant="filled" />
          <br></br>
          <TextField id="filled-basic" label="Zip" variant="filled" />
          <TextField id="filled-basic" label="Phone" variant="filled" />
          </form>
        </div>
        </AccordionDetails>
      </Accordion>


      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Payment Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>
          <form noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
        <InputLabel id="method">Method</InputLabel>
        <Select
          labelId="cards"
          value = {method}
          onChange={(e)=>{methodChange(e)}}
        >
          <MenuItem value="Visa">Visa</MenuItem>
          <MenuItem value="Mastercard">MasterCard</MenuItem>
          <MenuItem value = "American Express">American Express</MenuItem>
        </Select>
      </FormControl>
          <TextField id="filled-basic" label="Credit Card Number" variant="filled" />
          <TextField id="filled-basic" label="CVV Code " variant="filled" />
          <TextField id="filled-basic" label="EXP" variant="filled" />
          </form>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Delivery Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>
          <FormControl component="fieldset">
  <FormLabel component="legend">Delivery Options</FormLabel>
  <RadioGroup row aria-label="options" name="Delivery Options" onChange={handleChange}>
    <FormControlLabel value="Ground" control={<Radio />} label="Ground" />
    <FormControlLabel value="Overnight" control={<Radio />} label="Overnight" />
    <FormControlLabel value="Other" control={<Radio />} label="Other" />

  </RadioGroup>
  </FormControl> </div>
        </AccordionDetails>
      </Accordion>
<Container className = {classes.completeButton}>
<Button color="secondary">Complete Order</Button>
</Container>
    </div>
  );
  
}

export default Checkout;