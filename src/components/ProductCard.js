import React from "react";
import { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { DrawerContext } from "./../DrawerContext";

const BASE_URL = "http://localhost:3000/api";

const useStyles = makeStyles({
    cardSize: {
        height: "100%",
    },
    productTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        background: "#ad77eb",
        color: "#ffffff",
    },
    productPrice: {},
    productMedia: {
        padding: 10,
    },
    productContent: {
        padding: 10,
        justifyContent: "center",
    },
    ratingContainer: {
        justifyContent: "center",
        paddingTop: 5,
    },
    cardButtons: {
        justifyContent: "center",
    },
});

const userId = 1;

function ProductCards({ cart, setCart }) {
    const [products, setProducts] = useState([]);
    // const [selectedCard, setSelectedCard] = userState;

    //Get all products by this user and store in a userState
    useEffect(() => {
        axios
            .get(BASE_URL + `/users/products/${userId}`)
            .then((res) => {
                setProducts(res.data.userProducts);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }, []);

    const classes = useStyles();

    async function createUserCart(product) {
        // setCart([...cart, product.id]);

        try {
            const { data } = await axios.post(BASE_URL + `/carts/create/`, {
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

    console.log("cart at bottom of productcard is ", cart);
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

export default ProductCards;
