// openLib API paged retrival

let currentPage = 1;
let currentQuery = "";

async function searchBooks(page = 1) {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    currentQuery = query;
    currentPage = page;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=5&fields=title,isbn,author_name,first_publish_year`;

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
    div.className = "book";

    div.innerHTML = `
        <strong>${book.title}</strong><br>
        Author: ${book.author_name ? book.author_name[0] : "Unknown"}<br>
        First Published: ${book.first_publish_year || "N/A"}
    `;


    const button = document.createElement("button");
    button.textContent = "Add Book";

    button.onclick = () => addBook(book);

    div.appendChild(button);

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

