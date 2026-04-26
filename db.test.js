 const {
    findCreateUser,
    findCreateBook,
    findBook,
    addBooktoShelf,
    removeBookfromShelf,
    getUserShelf,
    getUserGenres
  } = require('./db');
  
  const { MongoClient } = require('mongodb');
  
  const uri = "mongodb+srv://jperez12_db_user:4lqZ4fo9WsLeHdmV@cs20.iekqa3t.mongodb.net/?appName=CS20";
  const client = new MongoClient(uri);
  const db = client.db("final");
  
  beforeAll(async () => {
    await client.connect();
  });
  
  afterAll(async () => {
    await client.close();
  });
  
  beforeEach(async () => {
    // clean test data
    await db.collection("profiles").deleteMany({ id: /test/ });
    await db.collection("books").deleteMany({ id: /test/ });
    await db.collection("user_books").deleteMany({ user_id: /test/ });
    await db.collection("user_genres").deleteMany({ id: /test/ });
  });



  //findCreateUser

  test("creates a new user if not exists", async () => {
    const user = await findCreateUser("test123", "Jake", "jake@test.com");
  
    expect(user).toBeDefined();
  
    const dbUser = await db.collection("profiles").findOne({ id: "test123" });
    expect(dbUser.name).toBe("Jake");
  });
  
  test("returns existing user if already exists", async () => {
    await findCreateUser("test123", "Jake", "jake@test.com");
    const user2 = await findCreateUser("test123", "Jake", "jake@test.com");
  
    expect(user2.id).toBe("test123");
  });
  


  //findCreateBook

  test("creates a book if not exists", async () => {
    await findCreateBook("testBook1", "Title", "Author", "Desc", "img");
  
    const book = await db.collection("books").findOne({ id: "testBook1" });
    expect(book.title).toBe("Title");
  });
  
  test("returns existing book if already exists", async () => {
    await findCreateBook("testBook1", "Title", "Author", "Desc", "img");
    const book = await findCreateBook("testBook1", "Title", "Author", "Desc", "img");
  
    expect(book.id).toBe("testBook1");
  });

//findBook

test("findBook returns null if not exists", async () => {
    const book = await findBook("doesNotExist");
    expect(book).toBeNull();
  });
  
  test("findBook returns book if exists", async () => {
    await findCreateBook("testBook2", "Title", "Author", "Desc", "img");
    const book = await findBook("testBook2");
  
    expect(book.id).toBe("testBook2");
  });


//addBookToShelf

test("adds book to shelf", async () => {
    const result = await addBooktoShelf("testUser1", "testBook1");
    expect(result).toBe(1);
  });
  
  test("does not add duplicate book", async () => {
    await addBooktoShelf("testUser1", "testBook1");
    const result = await addBooktoShelf("testUser1", "testBook1");
  
    expect(result).toBe(0);
});


//removeBookfromShelf

test("removes book from shelf", async () => {
    await addBooktoShelf("testUser1", "testBook1");
  
    const result = await removeBookfromShelf("testUser1", "testBook1");
    expect(result).toBe(1);
  });
  
  test("returns 0 if book not on shelf", async () => {
    const result = await removeBookfromShelf("testUser1", "testBook1");
    expect(result).toBe(0);
  });


//getUserShelf

test("returns all books on user shelf", async () => {
    await findCreateBook("testBook1", "Title1", "A", "D", "img");
    await findCreateBook("testBook2", "Title2", "B", "D", "img");
  
    await addBooktoShelf("testUser1", "testBook1");
    await addBooktoShelf("testUser1", "testBook2");
  
    const shelf = await getUserShelf("testUser1");
  
    expect(shelf.length).toBe(2);
  });

  //incrUserGenre

  test("increments user's genres when adding book to shelf", async () => {
    await findCreateBook("testBook1", "Title1", "A", ["fantasy", "horror"], "img");
    await findCreateBook("testBook2", "Title2", "B", ["fantasy", "romance"], "img");
  
    await addBooktoShelf("testUser1", "testBook1");
    await addBooktoShelf("testUser1", "testBook2");
  
    const genres = await getUserGenres("testUser1");

    expect(genres).toEqual([
      { genre: "fantasy", count: 2 },
      { genre: "horror", count: 1 },
      { genre: "romance", count: 1}
    ]);
  });