// setting up the database
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jperez12_db_user:4lqZ4fo9WsLeHdmV@cs20.iekqa3t.mongodb.net/?appName=CS20";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
const db = client.db("final");

/******************* DATABASE FUNCTIONS ******************/
/* 
after fetching a request from google auth, pass in the id
returned from google to this function along with the name and
email
if the user is already the database, it will be returned, 
otherwise, the user will be created and returned
*/
async function findCreateUser(googleID, name, email) {
    const profile = db.collection("profiles");
    const existingUser = await profiles.findOne({ id: googleID });
    if (existingUser) {
        return existingUser;
    } else {
        const new_user = {
            id: googleID,
            name: name,
            email, email
        }
        return await profile.insertOne(new_user);
    }
}
async function addBooktoShelf(googleID, bookID) {
    console.log("addBooktoShelf is a work in progress, check back later!");
}
async function getUserShelf() {
    console.log("getUserShelf is a work in progress, check back later!");
}
async function removeBookfromShelf(googleID, bookID) {
    console.log("removeBookfromShelf is a work in progress, check back later!");
}


// EXPORTS - make sure to include db.js to use these functions
module.exports = {
    findCreateUser,
    addBooktoShelf,
    getUserShelf,
    removeBookfromShelf
  };