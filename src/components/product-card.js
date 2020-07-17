import React from "react";
import { useState } from "react";
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

// put in some type of a global file (constants) / env-plugin w/ webpack
const BASE_URL = "http://localhost:3000/api/users";

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

function ProductCard() {
  const [products, setProducts] = useState([]);

  //Get all products by this user and store in a userState
  async function getUserProducts(userId) {
    try {
      const userProducts = await axios.get(BASE_URL + `/products/${userId}`);
      if (userProducts) {
        "Products Exist for this userId!";
        const newProductArray = userProducts.data.userProducts;

        setProducts(newProductArray);
        console.log(newProductArray);
      } else {
        "No products for that userId";
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  if (!products || !products.length) {
    getUserProducts(1);
  }

  const classes = useStyles();

  return (
    <Grid container spacing={8} justify="center">
      {products.map((products) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={products.name}>
          <Card className={classes.cardSize} variant="outlined">
            <CardActionArea>
              <Typography
                align="center"
                className={classes.productTitle}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {products.name}
              </Typography>
              <Typography
                align="center"
                className={classes.productPrice}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Price: ${products.price}
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
                  {products.description}
                </Typography>
              </CardContent>
              <Typography align="center">
                Quantity: {products.quantity}
              </Typography>
            </CardActionArea>
            <Grid container className={classes.ratingContainer}>
              <Rating name="size-large" value={products.rating} size="large" />
            </Grid>
            <CardActions className={classes.cardButtons}>
              <Button size="small" color="primary">
                Buy Now
              </Button>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCard;
