// ./src/components/drawers/buttons/RemoveBtn.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState } from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

// Styling
import variables from "../../../styles";
const { removeBtnStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function RemoveBtn() {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(removeBtnStyling);
    const classes = useStyles();
    const { removeBtn, removeBtnContainer, trashIcon } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <div className={removeBtnContainer}>
            <Button
                size="small"
                variant="contained"
                color="secondary"
                classes={{
                    containedSecondary: removeBtn,
                }}
            >
                <DeleteIcon className={trashIcon} />
            </Button>
        </div>
    );
}

export default RemoveBtn;
