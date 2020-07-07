// ./db/users.js


/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// username VARCHAR(255) UNIQUE NOT NULL,
// password VARCHAR(255) NOT NULL,
// "firstName" VARCHAR(255) NOT NULL,
// "lastName" VARCHAR(255) NOT NULL,
// email VARCHAR(255) UNIQUE NOT NULL,
// role varchar NOT NULL,
// addresses TEXT [],
// "paymentInfo" TEXT [],
// "shopName" VARCHAR (255),
// public BOOLEAN DEFAULT false,
// active BOOLEAN DEFAULT true


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");
const { getAllProductsByUserId, deleteProduct } = require("./products");


/*---------------------------------- Functions ---------------------------------------*/


//Adds new row to users table and returns new user object
const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
    addresses = '{}',
    paymentInfo = '{}',
    shopName = '',
    public,
    active
}) => {
        
    // TODO: add profile-image to column table 
    try {
        const { rows: [ users ] } = await client.query(
            `INSERT INTO users(username, "firstName", "lastName", email, password, role, addresses, "paymentInfo", "shopName", public, active)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username,firstName,lastName,email,password,role,addresses,paymentInfo,shopName, public, active]
        );

        return users;

    } catch(error){
        console.error(`There's been an error creating a new user @ createUser({username, firstname, lastname, email, password, role, addresses='{}', paymentInfo='{}', shopName, public, active}) in ./db/users.js. ${ error }`)
        throw error;
    }
}


//Updates row in users table and returns updated user object
const updateUser = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
          console.log("test")
        return;
      }
    
      try {
        const { rows: [ users ] }= await client.query(`
          UPDATE users
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return users;
      } catch (error) {
        console.error(`There's been an error updating a user @ updateUser(id, fields = {}) in ./db/users.js. ${ error }`)
        throw error;
      }
}


//Deletes row from users table and returns deleted user object
const deleteUser= async(userId) => {
    
    try{

        const userProducts = await getAllProductsByUserId(userId);
        
        await Promise.all(userProducts.map(async (productObj) => {
            await deleteProduct(productObj.id);
        }));

        const { rows: [ user ] } = await client.query(`
            DELETE FROM users
            WHERE id=$1
        `, [userId]);

        console.log("User Deleted!")

        return user;

    }
    catch(error){
        console.error(`There's been an error deleting a user @ deleteUser(userId) in ./db/users.js. ${ error }`)
        throw error;
    }
}


//Returns an array containing userObjects for every user in the users table
const getAllUsers = async () => {

    try {
        const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);

        return rows;

    }
    catch (error){
        console.error(`There's been an error getting all users @ geAllUsers() in ./db/users.js. ${ error }`)
        throw error;
    }
}
 

//Returns the user object, if it exists, of the user with the specified userId from the usertable
const getUserById = async (userId) => {
    try {
        const { rows: [ user ] } = await client.query(`
        SElECT * 
        FROM users
        WHERE id= $1
        `, [userId]);
        
        if(!user) {
            throw { 
                name: "UserNotFoundError",
                message: "Cannot find user with that userId"
            };   
        }
   
        return user

    } catch(error){
        console.error(`There's been an error getting a user by id @ getUserByUserId(userId) in ./db/users.js. ${ error }`)
        throw error;
    }
}


//Returns the user object, if it exists, of the user with the specified username from the usertable
const getUserByUserName = async (username) => {
    try{
        const { rows: [ user ] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1
        `, [username]);
    
        if(!user){
            throw {
                name: "UserNotFoundError",
                message: "Cannot find user with that userName"
            }
        }

        return user;

    } catch(error){
        console.error(`There's been an error getting a user by username @ getUserByUserName(username) in ./db/users.js. ${ error }`)
        throw error;
    }
}

function requireUser(req, res, next) {
    if(!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
  }


/*---------------------------------- Exports ---------------------------------------*/


module.exports = {
    createUser,
    getUserById,
    getUserByUserName,
    getAllUsers,
    updateUser,
    deleteUser,
    requireUser
}
