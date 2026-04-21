let currentQuery = "";
let currentPage = 1;
let totalResults = 0;

async function searchBooks(page = 1) {
  const query = document.getElementById("searchInput").value;

  if (query !== currentQuery) {
    currentPage = 1; // reset page if new search
  }

  currentQuery = query;
  currentPage = page;

  const res = await fetch(
    `/api/search?q=${encodeURIComponent(query)}&page=${currentPage}`
  );

  const data = await res.json();

  totalResults = data.numFound;

  renderResults(data.docs);
  updateUI();
}

function renderResults(books) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  books.forEach((book) => {
    const div = document.createElement("div");
    div.className = "book";

    div.innerHTML = `
      <strong>${book.title || "No title"}</strong><br/>
      Author: ${book.author_name ? book.author_name.join(", ") : "Unknown"}<br/>
      First published: ${book.first_publish_year || "N/A"}
    `;

    container.appendChild(div);
  });
}

function updateUI() {
  const pageInfo = document.getElementById("pageInfo");
  pageInfo.innerText = `Page ${currentPage}`;
}

function nextPage() {
  currentPage++;
  searchBooks(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    searchBooks(currentPage);
  }
}