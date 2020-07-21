// ./src/components/Banner.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React from "react";
import { Banner } from "material-ui-banner";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function BannerInsert() {
    return (
        <Banner
            icon={<div />}
            label="Hello, guest! Be sure to login or sign-up"
            open
        />
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default BannerInsert;
