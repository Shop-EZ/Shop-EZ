// ./src/components/ProductView.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React from "react";

// Material-UI Components
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";

// Styling
import variables from "../styles";
const { productViewStyling } = variables;

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles(productViewStyling);

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function ProductView() {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const classes = useStyles();

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    const productViewTemplate = () => {
        return (
            <>
                <Grid xs={12} sm={6} item>
                    <Card className={classes.leftContainer} variant="outlined">
                        <CardMedia
                            className={classes.productViewMedia}
                            height="100%"
                            component="img"
                            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/thebreakfastclub-1548798769.jpg"
                            title="Product example"
                        />
                        <Rating
                            name="size-large"
                            defaultValue={2}
                            size="large"
                        />
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} item>
                    <Card
                        height="100%"
                        className={classes.rightContainer}
                        variant="outlined"
                    >
                        <CardActionArea>
                            <Typography
                                align="center"
                                className={classes.productViewTitle}
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Title
                            </Typography>

                            <Typography
                                align="center"
                                className={classes.productViewPrice}
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Price: $99.99
                            </Typography>
                            <CardContent>
                                <Typography
                                    className={classes.productViewContent}
                                    component="p"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Pellentesque quis suscipit
                                    magna, vitae posuere dolor. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit.
                                    Pellentesque quis suscipit magna, vitae
                                    posuere dolor.Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    quis suscipit magna, vitae posuere
                                    dolor.Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    quis suscipit magna, vitae posuere dolor.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.productViewButtons}>
                            <Button size="small" color="primary">
                                Add to Cart
                            </Button>
                            <Button size="small" color="primary">
                                Buy Now
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </>
        );
    };

    return (
        <Grid
            container
            spacing={4}
            className={classes.productContainer}
            align="center"
        >
            {productViewTemplate()}
        </Grid>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default ProductView;
