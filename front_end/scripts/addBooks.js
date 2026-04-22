// You should store this after login
const user = JSON.parse(localStorage.getItem("user"));
const params = new URLSearchParams(window.location.search);
const googleID = params.get("userId");


async function addBook(book) {


    bookID = book.isbn[0]
    title = book.title
    author = book.author_name.join(", ")



    if (!bookID) {
        document.getElementById("status").innerText = "Enter a book ID";
        return;
    }

    const res = await fetch("/api/shelf/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        googleID,
        bookID,
        title,
        author
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

async function loadShelf() {
    const res = await fetch(`/api/shelf/${googleID}`);
    const books = await res.json();

    const list = document.getElementById("shelfList");
    list.innerHTML = "";

    books.forEach(book => {
    const li = document.createElement("li");
    li.innerText = `${book.title} (${book.author})`;

     // remove button
    const btn = document.createElement("button");
    btn.innerText = "Remove";

    btn.addEventListener("click", async () => {
        // remove from DOM
        li.remove();

        // OPTIONAL: also remove from backend
        fetch(`/api/shelf/${googleID}/${book.id}`, {
            method: "DELETE"
        });

        });
    
    li.appendChild(btn)
    list.appendChild(li);
    });
}

// load on page start
loadShelf();
