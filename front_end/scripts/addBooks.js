// getting googleID from Google Auth and storing it to be used across files
const googleID = localStorage.getItem("googleID");

if (!googleID) {
    window.location.href = "/index.html";
}

async function topSubject(isbn){
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const res = await fetch(url);
    const data = await res.json();
    const book = data[`ISBN:${isbn}`];
    if(!book.subjects){
        return [];
    }
    const top_genere = book.subjects.splice(0,5).map((element, index, array) => {
        return element.name;
      });
    return top_genere;
}


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

