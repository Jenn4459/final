/* ======================== INITIAL SETUP =========================*/
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jperez12_db_user:4lqZ4fo9WsLeHdmV@cs20.iekqa3t.mongodb.net/?appName=CS20";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
const db = client.db("final");

/* ======================== DATABASE FUNCTIONS =========================*/

/************************** findCreateUser *************************
 *
 * After fetching a request from google auth, pass in the id
 * returned from google to this function along with the name and
 * email
 *
 * Parameters:
 *      googleID: the ID provided from google auth
 *      name: the name provided from google auth
 *      email: the email provided from google auth
 *
 * Return: if the user is already the database, it will be returned, 
 *         otherwise, the user will be created and returned
 *
 * Expects
 *      an ID, name, and email to be provided
 * Notes:
 ******************************************************************/
async function findCreateUser(googleID, name, email) 
{
    const profile = db.collection("profiles");
    const existingUser = await profile.findOne({ id: googleID });
    if (existingUser) {
        return existingUser;
    } else {
        const new_user = {
            id: googleID,
            name: name,
            email: email
        }
        return await profile.insertOne(new_user);
    }
}

/************************** findCreateBook *************************
 *
 * After fetching a request from google books, pass in the books id
 * as well as the title, author, description, and image of the book
 * associated with the id
 *
 * Parameters:
 *      bookID: the ID provided from google Books
 *      title: the title of the book from google Books
 *      author: author of book from google Books
 *      description: description of book from google Books
 *      image: cover image of book from google Books
 *
 * Return: if the book is already the database, it will be returned, 
 *         otherwise, the book will be created and returned
 *
 * Expects
 *      an ID, title, author, description, and image  to be provided
 * Notes:
 ******************************************************************/
async function findCreateBook(bookID, title, author, description, image) 
{
    const find_book = db.collection("books");
    const book = await find_book.findOne({ id: bookID});
    if (book) {
        return book;
    } else {
        const new_book = {
            id: bookID,
            title: title,
            author: author,
            description: description,
            image: image
        }
        return await find_book.insertOne(new_book);
    }
}

/************************** findBook *************************
 *
 * This is the same as findCreateBook, but it doesn't create a 
 * a new book, it just finds it if it exists
 *
 * Parameters:
 *      bookID: the ID provided from google Books
 *
 * Return: if the book is already the database, it will be returned, 
 *         otherwise, this function will return NULL
 *
 * Expects
 *      a book ID
 * Notes: this function doesn't check if the book exists, so the 
 *        user should be sure to check if NULL is returned
 ******************************************************************/
async function findBook(bookID) 
{
    const find_book = db.collection("books");
    const book = await find_book.findOne({ id: bookID});
    return book;
}

/************************** addBooktoShelf *************************
 *
 * This function adds a book to a users bookshelf
 *
 * Parameters:
 *      googleID: the ID provided from google auth
 *      bookID: the ID provided from google Books
 *
 * Return: if the book was already on the users shelf, this function 
 *         returns 0, otherwise it is added to their shelf and 1 
 *         is returned
 *
 * Expects
 *      a google ID and a book ID
 * Notes: this function doesn't return any objects, just a 0 or 1 to
 *        indicate if it was added or if it already existed
 ******************************************************************/
async function addBooktoShelf(googleID, bookID) 
{
    const user_books = db.collection("user_books");
    const added = await user_books.findOne(
            { user_id: googleID, 
            book_id: bookID
            });
    if (!added) {
        const new_connection = {
            user_id: googleID,
            book_id: bookID
        }
        await user_books.insertOne(new_connection);
        return 1;
    } else {
        return 0;
    }
}

/************************** removeBookfromShelf *************************
 *
 * This function removes a book to a users bookshelf
 *
 * Parameters:
 *      googleID: the ID provided from google auth
 *      bookID: the ID provided from google Books
 *
 * Return: if the book was on the users shelf and was able to be 
 *         deleted, this function deletes the book and returns 1
 *         Otherwise, there was no book to delete so it returns 0
 *
 * Expects
 *      a google ID and a book ID
 * Notes: this function doesn't return any objects, just a 0 or 1 to
 *        indicate if it was removed or not
 ******************************************************************/
async function removeBookfromShelf(googleID, bookID) 
{
    const user_books = db.collection("user_books");
    const exists = await user_books.findOne(
        { 
            user_id: googleID, 
            book_id: bookID
        });

    if (exists) {
        await user_books.deleteOne({ user_id: googleID, book_id: bookID});
        return 1;
    } else {
        return 0;
    }
}

/************************** getUserShelf *************************
 *
 * This function finds all books on a users shelf
 *
 * Parameters:
 *      googleID: the ID provided from google auth
 *
 * Return: returns an array in which each element is a book object
 *         associated with the provided users shelf
 *
 * Expects
 *      a google ID
 * Notes: the book objects contain the ID, title, author, description,
 *        and image
 ******************************************************************/
async function getUserShelf(googleID) 
{
    const find_shelf = db.collection("user_books");
    const user_books = find_shelf.find({ user_id: googleID});
    return getShelfHelper(user_books);
}

/************************** getShelfHelper *************************
 *
 * This is just a helper function for getUserShelf, not accessible
 * to the user
 *
 * Parameters:
 *      user_books: the cursor returned from find function
 *
 * Return: the array of books on a users shelf
 *
 * Expects
 *      cursor from find function
 * Notes: 
 ******************************************************************/
async function getShelfHelper(user_books) 
{
    const user_books_array = await user_books.toArray();
    const get_books = db.collection("books");
    let shelf = [];
    for (const element of user_books_array) {
        const curr_books = await get_books.find({id: element.book_id});
        const book_array = await curr_books.toArray();
        shelf.push(...book_array);
    }
    return shelf;
}



/* ======================== FUNCTION EXPORTS =========================
 *     Make sure to include db.js in your files to use these!!!
 * ==================================================================*/
module.exports = {
    findCreateUser,
    findCreateBook,
    findBook,
    addBooktoShelf,
    getUserShelf,
    removeBookfromShelf
  };