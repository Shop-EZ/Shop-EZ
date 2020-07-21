// ./src/components/BackButton.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import React from "react";
import { withRouter } from "react-router";

// Material-UI Components
import Button from "@material-ui/core/Button";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const BackButton = ({ history: { goBack }, children, ...props }) => (
    <Button {...props} onClick={goBack}>
        {children}
    </Button>
);

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default withRouter(BackButton);
