// ./src/components/drawers/accordions/inputs/PasswordInput

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React, { useState } from "react";

// Material-UI Components
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Styling
import variables from "../../../../styles";
const { inputStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function PasswordInput({ value, onChange }) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [passVisible, setPassVisible] = useState(false);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(inputStyling);

    const classes = useStyles();
    const { input } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <TextField
            required
            placeholder="Password"
            variant="outlined"
            label="Password"
            className={input}
            onChange={onChange}
            type={passVisible ? "text" : "password"}
            value={value}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setPassVisible(!passVisible)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {passVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default PasswordInput;
