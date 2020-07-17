// ./src/components/CartDrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PaymentIcon from "@material-ui/icons/Payment";
import Accordion from "@material-ui/core/Accordion";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

import { DrawerContext } from "../DrawerContext";
import variables from "../styles";

// consider breaking this file out into multiple components

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const {
  secondaryAccent,
  primaryAccent,
  drawerWidth,
  textColor,
  navHeight,
} = variables;

const testCart = [
  {
    id: 1,
    name: "Pet Rock",
    description: "A friendly rock found in Joshua Tree looking for a home",
    price: 300.99,
    quantity: 1,
    delivery: '{"pickup"}',
    rating: 5.0,
    userId: 3,
    categoryId: "{2, 3}",
  },
  {
    id: 2,
    name: "Turntables",
    description:
      "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
    price: 450.99,
    quantity: 2,
    delivery: '{"standard", "express", "next-day"}',
    rating: 3.5,
    userId: 4,
    categoryId: "{4}",
  },
  {
    id: 3,
    name: "Embroidered Dress",
    description:
      "One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!",
    price: 60.0,
    quantity: 50,
    delivery: '{"standard"}',
    rating: 5.0,
    userId: 2,
    categoryId: "{1}",
  },
];

function CartDrawer() {
  const { drawer, toggleDrawer } = useContext(DrawerContext);

  /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

  const useStyles = makeStyles({
    // Drawer

    wrapper: {
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      display: "flex",
    },

    drawer: {
      overflowX: "hidden",
      width: drawerWidth,
      flexShrink: 0,
    },

    drawerPaper: {
      backgroundColor: "rgba(90,68,179, 1)",
      width: drawerWidth,
      color: textColor,
    },

    drawerContainer: {
      overflow: "auto",
    },

    // Cart

    checkout: {
      background: secondaryAccent,
      width: "95%",

      "&:hover": {
        background: "rgba(241,180,11,1)",
      },
    },

    blankSpace: {
      height: `calc(${navHeight} + 0.5rem)`,
    },

    // Cart Items

    listItem: {
      padding: "0",
    },

    accordion: {
      boxShadow: ` 0 -1px 8px ${primaryAccent} `,
      paddingRight: "0",
      paddingLeft: "0",
    },

    accordionRoot: {
      background: "rgba(255, 255, 255, 0.75)",
      width: "100%",
    },

    // Cart Item Header

    headerDiv: {
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.7rem",
      flexWrap: "wrap",
      display: "flex",
      flexBasis: "1",
      width: "100%",
    },

    headerTitle: {
      padding: "0 0.7rem",
      fontSize: "0.9rem",
      width: "70%",
    },

    headerPrice: {
      padding: "0 0.7rem",
      fontSize: "0.8rem",
      textAlign: "right",
      width: "30%",
    },
    // Cart Item Body

    accordionDetails: {
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
    },

    removeBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      width: "10px",
    },

    productImage: {
      width: `calc( ${drawerWidth} - 80% )`,
      boxShadow: "0 0 2px black",
      marginTop: "0.5rem",
      height: "auto",
      flexGrow: 3,
    },

    qtyContainer: {
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: "0.3rem",
      display: "flex",
      flexGrow: 1,
    },

    qty: {
      marginBottom: "0.5rem",
      textAlign: "center",
      fontSize: "0.8rem",
      width: "15%",
    },

    qtyCount: {
      boxShadow: "0 0 3px black",
      borderColor: "transparent",
      marginBottom: "2rem",
      borderRadius: "5px",
      textAlign: "center",
      height: "2rem",
      width: "4rem",
    },

    removeBtn: {
      background: "rgba(146,8,8, 1)",
      boxShadow: "0 0 2px black",
      padding: "8px 0",
      width: "100%",

      "&:hover": {
        background: "rgba(125,8,8, 1)",
      },
    },

    trashIcon: {
      width: "1rem",
    },
  });

  const classes = useStyles();

  const {
    drawer: drawerStyle,
    removeBtnContainer,
    accordionDetails,
    drawerContainer,
    accordionRoot,
    productImage,
    qtyContainer,
    drawerPaper,
    headerPrice,
    headerTitle,
    blankSpace,
    trashIcon,
    headerDiv,
    accordion,
    removeBtn,
    checkout,
    qtyCount,
    listItem,
    wrapper,
    qty,
  } = classes;

  /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

  const cartList = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <div id="cart-drawer" className={wrapper}>
        <Button
          variant="contained"
          color="secondary"
          classes={{
            containedSecondary: checkout,
          }}
          startIcon={<PaymentIcon />}
        >
          Checkout
        </Button>

        <List>
          {testCart.map((productObj, index) => (
            <ListItem component="div" key={productObj.id} className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`panel${index}ah-content`}
                  id={`panel${index}ah-header`}
                  className={accordion}
                >
                  <div className={headerDiv}>
                    <Typography
                      align="left"
                      variant="h3"
                      className={headerTitle}
                    >
                      {" "}
                      {`${productObj.quantity} x ${productObj.name}`}{" "}
                    </Typography>

                    <Typography
                      align="right"
                      variant="h4"
                      className={headerPrice}
                    >
                      {" "}
                      {/* If price is not already formatted as a decimal, add ".00" to it */}
                      {`$${
                        +productObj.price === Math.floor(+productObj.price)
                          ? `${+productObj.price}.00`
                          : productObj.price
                      } `}{" "}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={accordionDetails}>
                  <img
                    className={productImage}
                    src="/assets/placeholder_product.png"
                    alt="A generic placeholder image of an outline of sunglasses"
                  />

                  <div className={qtyContainer}>
                    <Typography className={qty} align="left" variant="h4">
                      {" "}
                      Qty:
                    </Typography>

                    {/* Add conditional handler to change quantity if it's 3 digits or more */}
                    <input
                      className={qtyCount}
                      type="number"
                      min="1"
                      defaultValue={productObj.quantity}
                     />

                    <div className={removeBtnContainer}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        classes={{ containedSecondary: removeBtn }}
                      >
                        <DeleteIcon className={trashIcon} />
                      </Button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

  return (
    <Drawer
      className={drawerStyle}
      anchor="right"
      open={drawer.cart}
      onClose={() => toggleDrawer("cart")}
      classes={{ paper: drawerPaper }}
    >
      <div className={blankSpace} />
      <div className={drawerContainer}>{cartList()}</div>
    </Drawer>
  );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartDrawer;
