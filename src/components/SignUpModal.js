// ./src/components/SignUpAccModal.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState } from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

/*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function SignUpModal({ submit, setSubmit }) {
    const classes = useStyles();

    const handleClose = () => {
        event.stopPropagation();
        event.preventDefault();
        setSubmit(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={submit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={submit}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Thank you!</h2>
                        <p id="transition-modal-description">
                            Thanks for signing up with Shop-Ez!
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------ */

export default SignUpModal;
