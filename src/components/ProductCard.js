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

// Context
import { DrawerContext } from "../DrawerContext";
import { UserContext } from "../UserContext";

// Styling
import variables from "../styles";
const { productCardStyling } = variables;

// Other packages/modules
import axios from "axios";

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(productCardStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function ProductCards({ shopId, height = "23rem" }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { cart, setCart, user } = useContext(UserContext);
    const { setAlert } = useContext(DrawerContext);
    const [products, setProducts] = useState([]);
    const [isHover, setIsHover] = useState(false);

    const userId = user.id;

    //Get all products by this user and store in a userState
    useEffect(() => {
        axios
            .get(`api/shops/products/${shopId}`)
            .then((res) => {
                setProducts(res.data.shopProducts);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }, []);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles2 = makeStyles({
        productContainer: {
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            height: `${height === "23rem" ? "41rem" : "55rem"}`,
            diplay: "flex",
            color: "white",
            width: "25rem",
        },

        productMedia: {
            borderRadius: "15px",
            height: `${height}`,
            padding: "2rem",
            margin: "auto",
            width: "23rem",
        },

        productMediaHover: {
            cursor: "pointer",
            height: `calc(${height} + 1rem)`,
            width: "24rem",
            padding: "2rem",
            margin: "auto",
        },
    });

    const classes = useStyles();
    const classes2 = useStyles2();

    /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

    // Adds product to cart, creating a new cart if one does not already exist, and incrementing if product is already in cart
    async function addToCart(product) {
        try {
            const { data: cartProductData } = await axios.get("/");

            const { data } = await axios.post(`/api/carts/create/`, {
                userId: userId,
                productId: product.id,
            });

            // Cart already exists, but target product is not yet in that cart; adds product to cart
            if (data.name === "CartProductAddedSuccess") {
                const newCartProduct = data.newCartProduct;
                newCartProduct.cartProductId = data.cartProductId;
                setCart([...cart, newCartProduct]);
                setAlert({
                    message: `${newCartProduct.name} has been added to you cart`,
                    severity: "success",
                    isVisible: "true",
                });
            }
            // Cart already exists and target product also exists in that cart; increments the cart product
            else if (data.name === "UpdatedProductQuantity") {
                const updatedProduct = data.updatedProduct;
                updatedProduct.qtyDesired = data.newQty;
                updatedProduct.cartProductId = data.cartProductId;
                const newCart = cart.map((cartProduct) => {
                    if (+cartProduct.id === product.id) {
                        return data.updatedProduct;
                    } else {
                        return cartProduct;
                    }
                });

                setCart(newCart);
                setAlert({
                    message: `${updatedProduct.name} has been added to you cart`,
                    severity: "success",
                    isVisible: "true",
                });

                // Cart doens't exist and neither does product; create cart and add product to it
            } else if (data.name === "CartCreatedAndProductAdded") {
                const newCartProduct = data.newCartProduct;
                newCartProduct.cartProductId = data.cartProductId;
                setCart([...cart, newCartProduct]);
                setAlert({
                    message: `${newCartProduct.name} has been added to you cart`,
                    severity: "success",
                    isVisible: "true",
                });
            } else {
                console.error("Product not added to cart successfully");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const cardTemplate = (product) => {
        console.log("product.id is ", product.id);

        return (
            <div
                className={classes2.productContainer}
                style={
                    height !== "23rem"
                        ? { paddingBottom: "6rem" }
                        : { paddingBottom: "1rem" }
                }
            >
                <Typography
                    align="center"
                    className={
                        isHover === product.id
                            ? classes.productTitleHover
                            : classes.productTitle
                    }
                    gutterBottom
                    variant="h5"
                    component="h2"
                    onMouseEnter={() => setIsHover(product.id)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => addToCart(product)}
                >
                    {product.name}
                </Typography>

                <CardMedia
                    className={
                        isHover === product.id
                            ? classes2.productMediaHover
                            : classes2.productMedia
                    }
                    component="img"
                    image={product.image}
                    title="Product example"
                    onMouseEnter={() => setIsHover(product.id)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => addToCart(product)}
                />

                <Typography
                    className={
                        isHover === product.id
                            ? classes.productDescription
                            : classes.hide
                    }
                    align="center"
                    component="p"
                >
                    {product.description}
                </Typography>
                <div className={classes.priceAndQty}>
                    <Typography
                        align="center"
                        className={
                            isHover === product.id
                                ? classes.productContentBottom
                                : classes.hide
                        }
                    >
                        Price: ${product.price}
                    </Typography>
                    <Typography
                        align="center"
                        className={
                            isHover === product.id
                                ? classes.productContentBottom
                                : classes.hide
                        }
                    >
                        Quantity: {product.qtyAvailable}
                    </Typography>
                </div>
                <Typography
                    align="center"
                    onMouseEnter={() => setIsHover(product.id)}
                    onMouseLeave={() => setIsHover(false)}
                    className={
                        isHover === product.id
                            ? classes.addToCart
                            : classes.hide
                    }
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </Typography>
                <Rating
                    name="size-large"
                    value={product.rating}
                    size="large"
                    onMouseEnter={() => setIsHover(product.id)}
                    onMouseLeave={() => setIsHover(false)}
                    className={
                        isHover === product.id
                            ? classes.ratingStyle
                            : classes.hide
                    }
                />
            </div>
            // <Card
            //     id={product.id}
            //     className={classes.cardSize}
            //     variant="outlined"
            //     onMouseEnter={() => setIsHover(product.id)}
            //     onMouseLeave={() => setIsHover(false)}
            // >
            //     <CardActionArea>
            //         <Typography
            //             align="center"
            //             className={classes.productTitle}
            //             gutterBottom
            //             variant="h5"
            //             component="h2"
            //         >
            //             {product.name}
            //         </Typography>
            //         <Typography
            //             align="center"
            //             className={classes.productPrice}
            //             gutterBottom
            //             variant="h5"
            //             component="h2"
            //         >
            //             Price: ${product.price}
            //         </Typography>
            //         <CardMedia
            //             className={classes.productMedia}
            //             component="img"
            //             image={product.image}
            //             title="Product example"
            //         />
            //         <CardContent>
            //             <Typography
            //                 className={
            //                     isHover === product.id
            //                         ? classes.productContent
            //                         : classes.hide
            //                 }
            //                 align="center"
            //                 component="p"
            //             >
            //                 {product.description}
            //             </Typography>
            //         </CardContent>
            //         <Typography
            //             align="center"
            //             className={
            //                 isHover === product.id
            //                     ? classes.productContent
            //                     : classes.hide
            //             }
            //         >
            //             Quantity: {product.qtyAvailable}
            //         </Typography>
            //     </CardActionArea>
            //     <Grid container className={classes.ratingContainer}>
            //         <Rating
            //             name="size-large"
            //             value={product.rating}
            //             size="large"
            //             className={
            //                 isHover === product.id
            //                     ? classes.productContent
            //                     : classes.hide
            //             }
            //         />
            //     </Grid>
            //     <CardActions className={classes.cardButtons}>
            //         <Button size="small" color="primary">
            //             Buy Now
            //         </Button>
            //         <Button
            //             onClick={() => addToCart(product)}
            //             size="small"
            //             color="primary"
            //         >
            //             Add to Cart
            //         </Button>
            //     </CardActions>
            // </Card>
        );
    };

    /*------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    function handleMouseEnter() {}

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Grid
            container
            spacing={8}
            justify="center"
            className={classes.gridRoot}
        >
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
