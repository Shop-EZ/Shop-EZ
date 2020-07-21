// ./src/styles

const primaryAccent = "rgba(173,119,235, 1)";
const secondaryAccent = "rgba(216,166,29, 1)";
const textColor = "rgba(255, 255, 255, 1)";
const themeLite = "rgba(255, 255, 255, 1)";
const themeMain = "rgba(61,47,117, 1)";
const themeDark = "rgba(48,48,48, 1)";
const postColor = "rgba(8,8,73, 0.7)";
const drawerWidth = "20rem";
const navHeight = "7rem";

const muiTheme = {
    palette: {
        primary: {
            light: "#3c2e75",
            main: "#080849",
            dark: "#000023",
        },
        secondary: {
            light: "#e5adff",
            main: "#b17de8",
            dark: "#7f4fb5",
        },
    },
};

const navStyling = {
    // Nav

    nav: {
        justifyContent: "space-between",
        background: themeMain,
        alignItems: "center",
        height: navHeight,
        diplay: "flex",
        zIndex: 1301,
    },

    navHeader: {
        zIndex: 1301,
    },

    // Logo Area

    leftNav: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
    },

    logo: {
        borderRight: `2px solid ${secondaryAccent}`,
        margin: "1rem 1rem 1rem 0.5rem",
        paddingRight: "1rem",
        width: "6rem",
        height: "auto",
    },

    explore: {
        boxShadow: ` 0 1px 4px ${secondaryAccent} `,
        opacity: "92%",
    },

    // Search Area
    mainSearch: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        width: "55vw",
    },

    mainSearchInput: {
        boxShadow: `0 0 4px ${primaryAccent}`,
        borderRadius: "10px",
        fontSize: "1.1rem",
        padding: "0.5rem",
        width: "50vw",
        height: "2rem",
        border: "none",

        "&:focus": {
            outline: "none",
        },
    },

    // icons

    icons: {
        "&:hover": {
            fontSize: "1.7rem",
        },
    },
};

const accordionStyling = {
    // Accordions

    accountAccordion: {
        boxShadow: ` 0 0 7px -4px black`,
        paddingRight: "0",
        paddingLeft: "0",

        "&:hover": {
            boxShadow: `0 0 8px ${secondaryAccent}`,
        },
    },

    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    accountListItem: {
        padding: 0,
        marginBottom: "1.5rem",
        width: "99%",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
        "&:hover": {
            fontSize: "1.7rem",
        },
    },

    //Accordion Body

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },

    //Settings

    comingSoon: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    settings: {
        fontSize: "2rem",
        width: "100%",
        textAlign: "center",
    },

    //Log out
    logOut: {
        "&:hover": {
            background: "rgba(125,8,8, 0.85)",
            boxShadow: "0 0 6px rgba(125,8,8, 1)",
        },
    },

    // Cart

    cartListItem: {
        padding: 0,
        width: "99%",
    },

    cartAccordion: {
        boxShadow: ` 0 -1px 8px ${primaryAccent} `,
        paddingRight: "0",
        paddingLeft: "0",
    },

    cartAccordionDetails: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
    },

    cartHeaderTitle: {
        padding: "0 0.7rem",
        fontSize: "0.9rem",
        width: "70%",
    },

    cartHeaderDiv: {
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.7rem",
        flexWrap: "wrap",
        display: "flex",
        flexBasis: "1",
        width: "100%",
    },

    cartHeaderPrice: {
        padding: "0 0.7rem",
        fontSize: "0.8rem",
        textAlign: "right",
        width: "30%",
    },

    // Cart Body

    productImage: {
        width: `calc( ${drawerWidth} - 80% )`,
        boxShadow: "0 0 2px black",
        marginTop: "0.5rem",
        height: "auto",
        flexGrow: 3,
    },

    qtyContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "0.3rem",
        display: "flex",
        flexGrow: 1,
    },

    qty: {
        marginBottom: "0.5rem",
        textAlign: "center",
        fontSize: "0.8rem",
        width: "15%",
    },

    qtyCount: {
        boxShadow: "0 0 3px black",
        borderColor: "transparent",
        marginBottom: "2rem",
        borderRadius: "5px",
        textAlign: "center",
        height: "2rem",
        width: "4rem",
    },
};

const drawerStyling = {
    // Drawer

    drawer: {
        overflowX: "hidden",
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        backgroundColor: "rgba(90,68,179, 0.98)",
        width: drawerWidth,
        color: textColor,
    },

    drawerContainer: {
        overflow: "auto",
    },

    blankSpaceAccount: {
        height: `calc(${navHeight} + 1.5rem)`,
    },

    blankSpaceCart: {
        height: `calc(${navHeight} + 0.5rem)`,
    },

    wrapper: {
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        display: "flex",
    },

    // Accordions

    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    list: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
    },

    //Accordion Body

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    input: {
        width: "85%",
        marginBottom: "1rem",
    },

    firstInput: {
        marginTop: "1rem",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },
};

const inputStyling = {
    input: {
        width: "85%",
        marginBottom: "1rem",
    },
    firstInput: {
        marginTop: "1rem",
    },
};

const checkOutBtnStyling = {
    checkout: {
        background: secondaryAccent,
        width: "95%",

        "&:hover": {
            background: "rgba(241,180,11,1)",
        },
    },
};

const removeBtnStyling = {
    removeBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "10px",
    },

    removeBtn: {
        background: "rgba(146,8,8, 1)",
        boxShadow: "0 0 2px black",
        padding: "8px 0",
        width: "100%",

        "&:hover": {
            background: "rgba(125,8,8, 1)",
        },
    },

    trashIcon: {
        width: "1rem",
    },
};

const checkoutStyling = {
    wholeComponent: {
        border: "solid #3d2f75 10px",
        margin: "1 em",
        marginBottom: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    checkoutAccordion: {
        textAlign: "center",
        marginRight: 150,
        marginLeft: 150,
        padding: 30,
        background: "white",
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    formControl: {
        margin: 1,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: 2,
    },
    completeButton: {
        textAlign: "center",
        marginTop: "1em",
        marginBottom: "1em",
    },
    headerText: {
        width: "100%",
    },
    headerWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconPadding: {
        paddingRight: "1rem",
    },
    accordionDetails: {
        alignItems: "center",
        justifyContent: "center",
    },
    accordionSummary: {
        alignItems: "center",
        justifyContent: "center",
    },
};

const productCardStyling = {
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
};

const productViewStyling = {
    productContainer: {
        color: "#ffffff",
        paddingLeft: "75px",
        paddingRight: "75px",
        background: "#3d2f75",
    },
    rightContainer: {
        height: "100%",
    },
    leftContainer: {
        height: "100%",
        padding: 40,
    },
    productViewTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        background: "#ad77eb",
        color: "#ffffff",
    },
    productViewPrice: {},
    productViewMedia: {
        padding: 20,
    },
    productViewContent: {
        paddingBottom: 10,
    },
    productViewButtons: {
        justifyContent: "center",
        background: "#ad77eb",
    },
};

const storeContentStyling = {
    storeContent: {
        marginRight: 75,
        marginLeft: 75,
        padding: 30,
        background: "#3d2f75",
    },
};

const storeHeaderStyling = {
    storeHeader: {
        background: "#3d2f75",
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 75,
        marginRight: 75,
        padding: 20,
        color: "#ffffff",
    },
};

// variables
const variables = {
    storeContentStyling,
    storeHeaderStyling,
    productCardStyling,
    productViewStyling,
    checkOutBtnStyling,
    removeBtnStyling,
    accordionStyling,
    checkoutStyling,
    secondaryAccent,
    drawerStyling,
    primaryAccent,
    inputStyling,
    drawerWidth,
    navStyling,
    themeMain,
    navHeight,
    themeLite,
    themeDark,
    textColor,
    postColor,
    muiTheme,
};

export default variables;
