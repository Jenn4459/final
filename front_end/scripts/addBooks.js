// You should store this after login
const user = JSON.parse(localStorage.getItem("user"));
const params = new URLSearchParams(window.location.search);
const googleID = params.get("userId");



async function addBook(book) {


    bookID = book.isbn[0];
    title = book.title;
    author = book.author_name.join(", ");
  
    top_genere = await topSubject(bookID);
    pub_date = book.first_publish_year;


    const res = await fetch("/api/shelf/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        googleID,
        bookID,
        title,
        author,
        top_genere,
        pub_date
    })
    });

    const data = await res.json();

    if (data.success) {
    document.getElementById("status").innerText = "Book added!";
    loadShelf();
    } else {
    document.getElementById("status").innerText = "Book already exists or failed";
    }
}

