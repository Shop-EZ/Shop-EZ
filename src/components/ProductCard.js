// ./src/components/ProductCard.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState, useEffect, useContext } from "react";

// Material-UI Components
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";

// Styling
import variables from "../styles";
const { productCardStyling } = variables;

// Other packages/modules
import axios from "axios";
import { DrawerContext } from "./../DrawerContext";

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(productCardStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const userId = 1;

function ProductCards({ cart, setCart }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [products, setProducts] = useState([]);

    //Get all products by this user and store in a userState
    useEffect(() => {
        axios
            .get(`api/users/products/${userId}`)
            .then((res) => {
                setProducts(res.data.userProducts);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }, []);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const classes = useStyles();

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

    async function createUserCart(product) {
        // setCart([...cart, product.id]);

        try {
            const { data } = await axios.post(`api/carts/create/`, {
                userId: userId,
                productId: product.id,
                priceTotal: product.price,
            });

            if (data.name === "CartProductAddedSuccess") {
                console.log(data);
            } else if (data.name === "UpdatedProductQuantity&priceTotal") {
                console.log(data);
            } else {
                console.error("Product not added to cart successfully");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Add productObj to cart
    const addToCart = (product) => {
        createUserCart(product);
    };

    const cardTemplate = (product) => {
        return (
            <Card
                id={product.id}
                className={classes.cardSize}
                variant="outlined"
            >
                <CardActionArea>
                    <Typography
                        align="center"
                        className={classes.productTitle}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {product.name}
                    </Typography>
                    <Typography
                        align="center"
                        className={classes.productPrice}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        Price: ${product.price}
                    </Typography>
                    <CardMedia
                        className={classes.productMedia}
                        component="img"
                        image="https://bit.ly/2WNi2Ml"
                        title="Product example"
                    />
                    <CardContent>
                        <Typography
                            className={classes.productContent}
                            align="center"
                            component="p"
                        >
                            {product.description}
                        </Typography>
                    </CardContent>
                    <Typography align="center">
                        Quantity: {product.quantity}
                    </Typography>
                </CardActionArea>
                <Grid container className={classes.ratingContainer}>
                    <Rating
                        name="size-large"
                        value={product.rating}
                        size="large"
                    />
                </Grid>
                <CardActions className={classes.cardButtons}>
                    <Button size="small" color="primary">
                        Buy Now
                    </Button>
                    <Button
                        onClick={() => addToCart(product)}
                        size="small"
                        color="primary"
                    >
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        );
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Grid container spacing={8} justify="center">
            {products.map((product, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                    {cardTemplate(product)}
                </Grid>
            ))}
        </Grid>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default ProductCards;
