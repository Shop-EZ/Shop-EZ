// ./src/Notice.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Styling
import variables from "../styles";
const { noticeStyling } = variables;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/
function Notice({ isVisible, message, handleClose, severity }) {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(noticeStyling);
    const classes = useStyles();
    const { noticeStyle, alertRoot } = classes;
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isVisible}
            autoHideDuration={4000}
            onClose={handleClose}
            className={noticeStyle}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                className={alertRoot}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default Notice;
