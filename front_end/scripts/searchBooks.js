// openLib API paged retrival
let currentPage = 1;
let currentQuery = "";

async function searchBooks(page = 1) {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    currentQuery = query;
    currentPage = page;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=7&fields=title,isbn,author_name,first_publish_year`;

    const res = await fetch(url);
    const data = await res.json();

    displayResults(data.docs);
    document.getElementById("pageInfo").innerText = `Page ${currentPage}`;
}


function displayResults(books) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";

    div.innerHTML = `
        <div class="book-card-title">${book.title}</div>
        <div class="book-card-author">
            ${book.author_name ? book.author_name[0] : "Unknown"}
        </div>
        <div>${book.first_publish_year || "N/A"}</div>
    `;

    const add = document.createElement("button");
    const details = document.createElement("button");

    add.textContent = "Add Book";
    details.textContent = "Details"

    add.onclick = () => addBook(book);
    details.onclick = () => window.location.href = `/details.html?isbn=${book.isbn[0]}`

    div.appendChild(add);
    div.appendChild(details)

    resultsDiv.appendChild(div);
    });
}

function nextPage() {
    searchBooks(currentPage + 1);
}

function prevPage() {
    if (currentPage > 1) {
    searchBooks(currentPage - 1);
    }
}

