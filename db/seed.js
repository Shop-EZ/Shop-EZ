// ./db/seed.js

/*------------------------------- Imports and Globals -----------------------------------*/

const bcrypt = require("bcrypt");
const chalk = require("chalk");
const client = require("./client");
const {
    createUser,
    createOrder,
    createProduct,
    createReview,
    createCart,
    createShop,
    createCategory,
    getUserById,
    getUserByUserName,
    getAllUsers,
    updateUser,
    deleteUser,
    updateCart,
    deleteCart,
    getCartByUserId,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getAllProducts,
    getProductById,
    getProductByName,
    updateProduct,
    deleteProduct,
    updateShop,
    deleteShop,
    getAllShops,
    getShopById,
    getShopByUserId,
    deleteReview,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserId,
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getProductsByCartId,
    addCategoryToProduct,
    removeCategoryFromProduct,
    addProductToOrder,
    removeProductFromOrder,
    addReviewToProduct,
    removeReviewFromProduct,
    addProductToUser,
    deleteProductFromUser,
    addOrderToUser,
    deleteOrderFromUser,
    deactivateProduct,
    deactivateUser,
    insertImagetoDB,
} = require("./index");

/*---------------------------------- Functions ---------------------------------------*/

//Tests functionality of database functions
async function testDB() {
    try {
        console.log(chalk.yellow("Start db testing..."));

        // Users table functions
        console.log(chalk.cyan("Testing Users table functions"));

        // console.log(chalk.magenta('Testing updateUser...'));
        // const updatedUser = await updateUser(1, {
        //     email: 'tony.dyleuth@anotherexample.com',
        //     "shopName": 'The Tonynator',
        //     public: false
        // });
        // console.log(chalk.green('updateUser result: '), updatedUser);

        // console.log(chalk.magenta('Testing deactivateUser...'));
        // const deactivatedUser = await deactivateUser(4);
        // console.log(chalk.green('deactiveUser result: '), deactivatedUser);

        // console.log(chalk.magenta('Testing deleteUser...'));
        // const deletedUser = await deleteUser(4);
        // console.log(chalk.green('deleteUser result: '), deletedUser);

        // console.log(chalk.magenta('Testing getAllUsers...'));
        // const allUsers = await getAllUsers();
        // console.log(chalk.green('getAllUsersResult: '), allUsers);

        // console.log(chalk.magenta('Testing getUserById... '));
        // const userById = await getUserById(3);
        // console.log(chalk.green('getUserById result: '), userById);

        // console.log(chalk.magenta('Testing getUserByUserName'));
        // const userByUsername = await getUserByUserName('caleb_rocks');
        // console.log(chalk.green('getUserByUserName result: '), userByUsername);

        // // Products table functions
        // console.log(chalk.cyan('Testing Products table functions'));

        // console.log('Testing getAllProducts')
        // const allProducts = await getAllProducts()
        // console.log("getAllProducts results", allProducts)

        // console.log("Testing getProductsById")
        // const getProductByIdResults = await getProductById(4)
        // console.log("GetProductById result", getProductByIdResults)

        // console.log("Testing getProductsByName")
        // const getProductByNameResults = await getProductByName("Turntables")
        // console.log("GetProductByName result", getProductByNameResults)

        // console.log("Testing updateProduct")
        // const updateProductResult = await updateProduct(2, {
        //     name: "Human Rock",
        //     description:"A human rock"
        // })
        // console.log("updateProduct result", updateProductResult)

        // console.log("Testing deactivateProduct")
        // const deactivateProductResult = await deactivateProduct(2)
        // console.log("deactivateProduct result", deactivateProductResult);

        // console.log("Testing getAllProductsByUserId")
        // const geAllProductsByUserIdResults = await getAllProductsByUserId(4)
        // console.log("getAllProductsByUserId result", geAllProductsByUserIdResults)

        // // Order table functions
        // console.log(chalk.cyan('Testing Orders table functions'));

        // console.log('Testing deleteOrder')
        // const deletedOrder = await deleteOrder(1)
        // console.log("DeleteOrder results", deletedOrder)

        // console.log('Testing getAllOrders')
        // const allOrders = await getAllOrders()
        // console.log("getAllOrders results", allOrders)

        // console.log('Testing getOrderById')
        // const orderByIdResult = await getOrderById(2)
        // console.log("getOrderById results", orderByIdResult)

        // console.log('Testing getOrderByUserId')
        // const orderByIdUserResult = await getOrderByUserId(3)
        // console.log("getOrderByUserId results", orderByIdUserResult)

        // // Cart table functions
        // console.log('Testing Carts table functions');

        // console.log('Testing updateCart...');
        // const updatedCart = await updateCart(2, { products: '{2, 3, 4}' });
        // console.log('updateCart result: ', updatedCart);

        // console.log('Testing deleteCart...');
        // const deletedCart = await deleteCart(1);
        // console.log('deleteCart result: ', deletedCart);

        // console.log('Testing getCartByUserId...');
        // const userCart = await getCartByUserId(2);
        // console.log('getCartByUserId result: ', userCart);

        // // Categories table functions
        // console.log(chalk.cyan('Testing Categories table functions'));

        // console.log('Testing updateCategory...');
        // const updatedCategory = await updateCategory(2, {name: 'Fun'});
        // console.log('updateCategory result: ', updatedCategory);

        // console.log('Testing deleteCategory...');
        // const deletedCategory = await deleteCategory(2);
        // console.log('deleteCategory result is ', deletedCategory);

        // console.log('Testing getAllCategories...');
        // const allCategories = await getAllCategories();
        // console.log('getAllCategories result is ', allCategories);

        // console.log('Testing getCategoryById...');
        // const categoryById = await getCategoryById(1);
        // console.log('getCategoryById result is ', categoryById);

        // console.log('Testing getCategoryByName');
        // const categoryByName = await getCategoryByName('music');
        // console.log('getCategoryByName result is ', categoryByName);

        // // Shops table functions
        // console.log(chalk.cyan('Testing Shops table functions'));

        // console.log("Testing updateShop")
        // const updatedShopResult = await updateShop(1, {
        //     userId:4,
        //     name:"Caleb's Shop",
        //     products: '{4}'
        // })
        // console.log("updateShop Result", updatedShopResult)

        // console.log("Testing DeleteShop")
        // const deleteShopresult = await deleteShop(2)
        // console.log("DeleteShop Result ", deleteShopresult)

        // console.log("Testing getAllShops")
        // const getAllShopresult = await getAllShops()
        // console.log("AllShop Result ", getAllShopresult)

        // console.log('Testing getShopById...');
        // const getShopByIdResult = await getShopById(1);
        // console.log('getShopById result: ', getShopByIdResult);

        // console.log('Testing getShopByUserId...');
        // const getShopByUserIdResult = await getShopByUserId(4);
        // console.log('getShopByUserId result: ', getShopByUserIdResult);

        // // Reviews table functions
        // console.log(chalk.cyan('Testing Reviews table functions'));

        // console.log("Testing deleteReview...");
        // const deletedReview = await deleteReview(2);
        // console.log('deleteReview result: ', deletedReview);

        // console.log('Testing getReviewsByProductId...');
        // const reviewByProdId = await getReviewsByProductId(1);
        // console.log('getReviewsByProductId result: ', reviewByProdId);

        // console.log('Testing getReviewsByUserId...');
        // const reviewByUserId = await getReviewsByUserId(1);
        // console.log('getReviewsByUserId result: ', reviewByUserId);

        // console.log('Testing updateReview...');
        // const updatedReview = await updateReview(1, {
        //     title: 'This rock ROCKS YOUR SOCKS OFF OKAY!!!!',
        //     comment: "I purchased this rock a week ago and was completely blown away. Not only does it actually rock, this rock also totally ROCKS!!! EDIT: It's been two months now and let me tell you, this rock has literally changed my life. Everything is amazing. If you haven't gotten one yet, you're missing out."
        // });
        // console.log('updateReview result:', updatedReview);

        // // Cart_products table functions
        // console.log(chalk.cyan('Testing Cart_products table functions'));

        // console.log('Testing addProductToCart...');
        // const addedCartProduct = await addProductToCart(1, 1);
        // console.log('addProductToCart result: ', addedCartProduct);

        // console.log('Testing getCartProductById...');
        // const cartByProdId = await getCartProductById(9);
        // console.log('getCartProductById result: ', cartByProdId);

        // console.log('Testing getProductsByCartId...');
        // const productsByCartId = await getProductsByCartId(1);
        // console.log('getProductsByCartId result: ', productsByCartId);

        // console.log('Testing removeProductFromCart...');
        // const removedCartProduct = await removeProductFromCart(1);
        // console.log('removeProductFromCart result: ', removedCartProduct);

        // // Category_products table functions
        // console.log(chalk.cyan('Testing category_products table functions'));

        // console.log('Testing addCategoryToProduct...');
        // const prodCategory = await addCategoryToProduct(2, 2);
        // console.log('addCategoryToProduct result: ', prodCategory);

        // console.log('Testing removeCategoryFromProduct...');
        // const deletedProdCategory = await removeCategoryFromProduct(2);
        // console.log('removeCategoryFromProduct result: ', deletedProdCategory);

        // //Order_products table functions
        // console.log(chalk.cyan('Testing order_products table functions'));

        // console.log('Testing addProductToOrder...');
        // const orderProd = await addProductToOrder(1, 1);
        // console.log('addProductToOrder result: ', orderProd);

        // console.log('Testing removeProductFromOrder...');
        // const removedOrderProd = await removeProductFromOrder(1);
        // console.log('removeProductFromOrder result: ', removedOrderProd);

        // //Product_reviews table functions
        // console.log(chalk.cyan('Testing product_reviews table functions'));

        // console.log(chalk.magenta('Testing addReviewToProduct...'));
        // const newReview = await addReviewToProduct(1, 1);
        // console.log(chalk.green('addReviewToProduct result:'), newReview);

        // console.log(chalk.magenta('Testing removeReviewFromProduct...'));
        // const removedReview = await removeReviewFromProduct(1);
        // console.log(chalk.green('removeReviewFromProduct result: '), removedReview);

        // // User_product table functions
        // console.log(chalk.cyan('Testing user_products table functions...'));

        // console.log(chalk.magenta('Testing addProductToUser'));
        // const userProduct = await addProductToUser(1, 1);
        // console.log(chalk.green('addProductToUser result: '), userProduct);

        // console.log(chalk.magenta('Testing deleteProductFromUser'));
        // const removedUserProd = await deleteProductFromUser(1);
        // console.log(chalk.green('deleteProductFromUser result: '), removedUserProd);

        // // User_orders table functions
        // console.log(chalk.cyan('Testing user_orders table functions...'));

        // console.log(chalk.magenta('Testing addOrderToUser'));
        // const userOrder = await addOrderToUser(1, 1);
        // console.log(chalk.green('addOrderToUser result: '), userOrder);

        // console.log(chalk.magenta('Testing deleteOrderFromUser'));
        // const removedUserOrder = await deleteOrderFromUser(1);
        // console.log(chalk.green('deleteOrderFromUser result: '), removedUserOrder);

        console.log(chalk.greenBright("Finished db testing"));
    } catch (error) {
        console.error(
            "Error testing db functions @ ./db/seed.js testDB()! Error: "
        );
        throw error;
    }
}

//Create all tables if they do not already exist
async function createTables() {
    console.log(chalk.yellow("Starting to create tables..."));
    try {
        //TODO: Add image array
        //Users table
        await client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role varchar NOT NULL,
                addresses TEXT [],
                "paymentInfo" TEXT [],
                "shopName" VARCHAR (255),
                public BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true
            );`
        );

        //TODO: Add image array
        //Products table
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price FLOAT(2) NOT NULL,
                quantity INTEGER NOT NULL,
                delivery TEXT [],
                rating FLOAT(1),
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "categoryId" INTEGER [],
                active BOOLEAN DEFAULT true
            );`);

        //User_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_products (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`);

        //Categories table
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(25) UNIQUE NOT NULL
            );`);

        //Category_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS category_products(
                id SERIAL PRIMARY KEY,
                "categoryId" INTEGER REFERENCES categories(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`);

        //TODO: Add media array
        //Reviews table
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(255),
                rating INTEGER NOT NULL,
                comment TEXT NOT NULL
            );`);

        //Product_reviews join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS product_reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                "reviewId" INTEGER REFERENCES reviews(id) NOT NULL
            );`);

        //Carts table (userId not required for non-users to be able to purchase)
        await client.query(`
            CREATE TABLE IF NOT EXISTS carts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id)
            );`);

        //Cart_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart_products(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES carts(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                 quantity INTEGER DEFAULT '1',
                 priceTotal FLOAT(2) NOT NULL,
                 UNIQUE ("cartId","productId")
            
            );`);

        //TODO: Add support for receipt_id to table
        //Orders table
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders(
                id SERIAL PRIMARY KEY,
                products INTEGER [] NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderTotal" FLOAT(2) NOT NULL,
                "shippingAddress" VARCHAR(255) NOT NULL,
                fulfilled BOOLEAN DEFAULT false
            );`);

        //User_orders join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_orders(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL
            );`);

        //Order_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS order_products(
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`);

        //TODO: Add media array
        //Shops table
        await client.query(`
            CREATE TABLE IF NOT EXISTS shops(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                name VARCHAR(255) UNIQUE NOT NULL,
                products INTEGER [],
                description TEXT
            );`);

        //Receipts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS receipts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                products INTEGER [] NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderTotal" FLOAT(2) NOT NULL,
                shippingAddress VARCHAR(255) NOT NULL,
                payment text [] NOT NULL
            );`);

        //Support_messages table
        await client.query(`
            CREATE TABLE IF NOT EXISTS support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id),
                "productId" INTEGER REFERENCES products(id),
                "storeId" INTEGER REFERENCES shops(id),
                messages TEXT [] NOT NULL
            );`);

        //User_support_messages join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "interactionId" INTEGER REFERENCES support_messages(id) NOT NULL
            );`);

        //TODO: Add media array and figure out if there's a way to make one of three fields required
        //Posts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                "postBody" TEXT,
                comments INTEGER []
            );`);

        //User_posts join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_posts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "postId" INTEGER REFERENCES posts(id) NOT NULL
            );`);

        //Comments table
        await client.query(`
            CREATE TABLE IF NOT EXISTS comments(
                id SERIAL PRIMARY KEY,
                "postsId" INTEGER REFERENCES posts(id) NOT NULL,
                comment TEXT NOT NULL
            );`);

        //Images Table
        await client.query(`
            CREATE TABLE images (
            id SERIAL PRIMARY KEY,
            "imgName" TEXT,
            img BYTEA
        );`);

        console.log(chalk.greenBright("Finished creating tables!"));
    } catch (error) {
        console.error(
            "Error creating tables @ db/seed.js createTables()! Error: ",
            error
        );
        throw error;
    }
}

//Drops all tables if they exist
async function dropTables() {
    try {
        console.log(chalk.yellow("Starting to drop tables..."));

        await client.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS user_posts;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS user_support_messages;
        DROP TABLE IF EXISTS support_messages;
        DROP TABLE IF EXISTS receipts;
        DROP TABLE IF EXISTS shops;
        DROP TABLE IF EXISTS product_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS user_orders;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS category_products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS images;
        `);

        console.log(chalk.greenBright("Finished dropping tables!"));
    } catch (error) {
        console.error("Error dropping tables @ db/seed.js! Error: ", error);
        throw error;
    }
}

//Creates seed data of initial users
async function createInitialUsers() {
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     username VARCHAR(25) UNIQUE NOT NULL,
    //     password VARCHAR(25) NOT NULL,
    //     "firstName" VARCHAR(25) NOT NULL,
    //     "lastName" VARCHAR(25) NOT NULL,
    //     email VARCHAR(255) UNIQUE NOT NULL,
    //     role varchar NOT NULL,
    //     addresses TEXT [],
    //     "paymentInfo" TEXT [],
    //     "shopName" VARCHAR (50),
    //     public BOOLEAN DEFAULT false,
    //     active BOOLEAN DEFAULT true

    console.log(chalk.yellow("Creating initial users..."));

    const SALT_COUNT = 10;

    try {
        const tony = await createUser({
            username: "tdyleuth",
            password: await bcrypt.hash("password123", SALT_COUNT),
            firstName: "Tony",
            lastName: "Dyleuth",
            email: "tony.dyleuth@example.com",
            role: "admin",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: true,
            active: true,
        });

        const nahid = await createUser({
            username: "nahid_alami",
            password: await bcrypt.hash("password234", SALT_COUNT),
            firstName: "Nahid",
            lastName: "Alami",
            email: "nahidalami@example.com",
            role: "merchant",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: true,
            active: true,
        });

        const caleb = await createUser({
            username: "caleb_rocks",
            password: await bcrypt.hash("password345", SALT_COUNT),
            firstName: "Caleb",
            lastName: "Henderson",
            email: "caleb_rocks@example.com",
            role: "user",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "Caleb's Rocks",
            public: true,
            active: true,
        });

        const yahya = await createUser({
            username: "yhafez",
            password: await bcrypt.hash("password212", SALT_COUNT),
            firstName: "Yahya",
            lastName: "Hafez",
            email: "yhafez3@example.com",
            role: "user",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: false,
            active: true,
        });

        console.log(chalk.greenBright("Finished creating initial users!"));
    } catch (error) {
        console.error(
            "Error creating initial users @ db/seed.js createInitialUsers()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial categories
async function createInitialCategories() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // name VARCHAR(25) UNIQUE NOT NULL

    console.log(chalk.yellow("Creating initial categories..."));

    const clothing = await createCategory({ name: "clothing" });

    const recreation = await createCategory({ name: "recreation" });

    const electronics = await createCategory({ name: "electronics" });

    const music = await createCategory({ name: "music" });

    const education = await createCategory({ name: "education" });

    try {
        console.log(chalk.greenBright("Finished creating initial categories!"));
    } catch (error) {
        console.error(
            "Error creating initial categories @ db/seed.js createInitialCategories()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial users
async function createInitialProducts() {
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     description TEXT NOT NULL,
    //     price FLOAT(2) NOT NULL,
    //     quantity INTEGER NOT NULL,
    //     delivery TEXT [],
    //     rating FLOAT(1),
    //     "userId" INTEGER REFERENCES users(id) NOT NULL,
    //     "categoryId" INTEGER []

    console.log(chalk.yellow("Creating initial products..."));

    try {
        const rock = await createProduct({
            name: "Pet Rock",
            description:
                "A friendly rock found in Joshua Tree looking for a home",
            price: 300.99,
            quantity: 1,
            delivery: '{"pickup"}',
            rating: 5.0,
            userId: 3,
            categoryId: "{2, 3}",
        });

        const turnTable = await createProduct({
            name: "Turntables",
            description:
                "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
            price: 450.99,
            quantity: 2,
            delivery: '{"standard", "express", "next-day"}',
            rating: 3.5,
            userId: 4,
            categoryId: "{4}",
        });

        const dress = await createProduct({
            name: "Embroidered Dress",
            description:
                "One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!",
            price: 60.0,
            quantity: 50,
            delivery: '{"standard"}',
            rating: 5.0,
            userId: 2,
            categoryId: "{1}",
        });

        const course = await createProduct({
            name: "Fullstack Software Development Course",
            description:
                "A part-time course offered by the incredible Fullstack Academy of Code to get you coding in your dream job in 6-months",
            price: "11000.00",
            quantity: 999,
            delivery: '{"electronic"}',
            rating: 5.0,
            userId: 1,
            categoryId: "{5}",
        });

        const course2 = await createProduct({
            name: "Java for Dummies Course",
            description: "A Java course offered to beginners of all ages",
            price: "99.00",
            quantity: 100,
            delivery: '{"electronic"}',
            rating: 3,
            userId: 1,
            categoryId: "{5}",
        });

        const course3 = await createProduct({
            name: "Mobile Dev for Dummies Course",
            description:
                "A Mobile development course offered to beginners of all ages",
            price: "35.00",
            quantity: 100,
            delivery: '{"electronic"}',
            rating: 4.0,
            userId: 1,
            categoryId: "{5}",
        });

        const course4 = await createProduct({
            name: "Passive Income Ideas",
            description:
                "A course that teaches different ways to make passive income",
            price: "25.00",
            quantity: 40,
            delivery: '{"electronic"}',
            rating: 2.0,
            userId: 1,
            categoryId: "{5}",
        });

        const course5 = await createProduct({
            name: "Entrepenuer Crash Course",
            description: "Learn to become an entrepenuer step by step",
            price: "65.00",
            quantity: 100,
            delivery: '{"electronic"}',
            rating: 4.0,
            userId: 1,
            categoryId: "{5}",
        });

        const course6 = await createProduct({
            name: "Become a Chef",
            description:
                "Learn to become chef as little as 1 day with this course ",
            price: "100.00",
            quantity: 100,
            delivery: '{"electronic"}',
            rating: 3.0,
            userId: 1,
            categoryId: "{5}",
        });

        console.log(chalk.greenBright("Finished creating initial products!"));
    } catch (error) {
        console.error(
            "Error creating initial products @ db/seed.js createInitialProducts()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial shops
async function createInitialShops() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // name VARCHAR(255) UNIQUE NOT NULL,
    // products INTEGER [],
    // description TEXT

    console.log(chalk.yellow("Creating initial shops..."));

    try {
        const calebsRocks = await createShop({
            userId: 3,
            name: "Caleb's Rocks",
            products: "{1}",
            description:
                "The finest rocks in the industry, but also the finest rocking tunes in that industry too",
        });

        const lamasatyFashion = await createShop({
            userId: 2,
            name: "Lamasaty Fashion",
            products: "{3}",
            description: "An Arabic and Islamic clothing and accessory store",
        });

        const djHub = await createShop({
            userId: 4,
            name: "DJ Hub",
            products: "{2}",
            description:
                "The one-stop shop for all your DJ'ing needs. And when I say all, I really mean ALL!",
        });

        const fullStack = await createShop({
            userId: 1,
            name: "Fullstack Academy of Code",
            products: "{4, 1}",
            description:
                "A coding bootcamp dedicated to helping you excel in the tech industry",
        });

        console.log(chalk.greenBright("Finished creating initial shops!"));
    } catch (error) {
        console.error(
            "Error creating initial shops @ db/seed.js createInitialShops()! Error: ",
            error
        );
        throw error;
    }
}
//Create seed data of initial reviews
async function createInitialReviews() {
    //Reference
    // id SERIAL PRIMARY KEY,
    // "productId" INTEGER REFERENCES products(id) NOT NULL,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // title VARCHAR(255),
    // rating INTEGER NOT NULL,
    // comment TEXT NOT NULL

    console.log(chalk.yellow("Creating initial reviews..."));

    try {
        const satisfied = await createReview({
            productId: 1,
            userId: 4,
            title: "This rock ROCKS",
            rating: 5,
            comment:
                "I purchased this rock a week ago and was completely blown away. Not only does it actually rock, this rock also totally ROCKS!!!",
        });

        const angry = await createReview({
            productId: 2,
            userId: 2,
            title: "Janky turntables, 10/10 don't reccomend",
            rating: 1,
            comment:
                "I purchased these turtables expecting them to at the very least work. Imagine my fury when I instead received a cardboard cut out of a turntable. Absolutely ridiculous, I demand my money back",
        });

        const confused = await createReview({
            productId: 4,
            userId: 1,
            title: "Am I too good of a coder?",
            rating: 3,
            comment:
                "I had really high expectations of Fullstack, but this was just a whole nother level. I'm almost in disbelief at how hirable I am.",
        });

        const ecstatic = await createReview({
            productId: 3,
            userId: 3,
            title: "",
            rating: 5,
            comment:
                "I'm in absolute love with this dress, it's exactly what my wife and I were looking for! Thanks Lamasaty fashion!!!",
        });

        console.log(chalk.greenBright("Finished creating initial reviews!"));
    } catch (error) {
        console.error(
            "Error creating initial reviews @ db/seed.js createInitialReviews()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial carts
async function createInitialCarts() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES user(id),
    // products INTEGER []

    console.log(chalk.yellow("Creating initial carts..."));

    try {
        const tonysCart = await createCart({
            userId: 1,
        });

        // const nahidsCart = await createCart({
        //     userId: 2,
        //     products: "{2}",
        // });

        // const calebsCart = await createCart({
        //     userId: 3,
        //     products: "{3, 2}",
        // });

        // const yahyasCart = await createCart({
        //     userId: 4,
        //     products: "{1, 4, 2}",
        // });

        // const anonsCart = await createCart({
        //     products: "{1, 2, 4}",
        // });

        console.log(chalk.greenBright("Finished creating initial carts!"));
    } catch (error) {
        console.error(
            "Error creating initial carts @ db/seed.js at createInitialCarts()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial orders
async function createInitialOrders() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // products INTEGER [] NOT NULL,
    // "orderDate" DATE NOT NULL,
    // "orderTotal" FLOAT(2) NOT NULL,
    // shippingAddress VARCHAR(255) NOT NULL,
    // fulfilled BOOLEAN DEFAULT false

    console.log(chalk.yellow("Creating initial orders..."));

    try {
        const rocks = await createOrder({
            userId: 1,
            products: "{1}",
            orderDate: "2020-05-08",
            orderTotal: 100.32,
            shippingAddress: "12345 Street Ln., City, ST, 12345",
        });

        const clothes = await createOrder({
            userId: 2,
            products: "{1, 2}",
            orderDate: "2020-05-08",
            orderTotal: 52.22,
            shippingAddress: "12345 Street Ln., City, ST, 12345",
        });

        const music = await createOrder({
            userId: 3,
            products: "{2, 3}",
            orderDate: "2020-05-08",
            orderTotal: 2.42,
            shippingAddress: "12345 Street Ln., City, ST, 12345",
        });

        const curriculum = await createOrder({
            userId: 4,
            products: "{1, 2, 3}",
            orderDate: "2020-05-08",
            orderTotal: 11000.32,
            shippingAddress: "12345 Street Ln., City, ST, 12345",
        });

        console.log(chalk.greenBright("Finished creating initial orders!"));
    } catch (error) {
        console.error(
            "Error creating initial orders @ db/seed.js createInitialOrders()! Error: ",
            error
        );
        throw error;
    }
}

//CreateTestImage to DB
async function createTestImage() {
    console.log(chalk.yellow("Creating image test"));
    try {
        const newImageInsert = await insertImagetoDB({
            imgName: "TestImage",
            image:
                "/Users/fishyohangar/Desktop/Bootcamp/curriculum/Shop-EZ-master/public/assets/logo.png",
        });

        console.log("Test image ", newImageInsert);

        console.log(chalk.green("Finished image test"));

        return newImageInsert;
    } catch (error) {
        console.error("Error creating test image", error);
        throw error;
    }
}

//Connects to client, then drops and rebuilds all tables with initial seed data
async function bootstrap() {
    try {
        console.log(chalk.blue("Connected to DB!"));

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialShops();
        await createInitialReviews();
        await createInitialCarts();
        await createInitialOrders();
        await createTestImage();
    } catch (error) {
        console.error(
            "Error bootstrapping in ./db/seed.js at bootstrap(). Error: ",
            error
        );
        throw error;
    }
}
/*---------------------------------- Run-Time ---------------------------------------*/

bootstrap()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
