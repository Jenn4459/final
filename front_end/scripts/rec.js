// getting googleID from Google Auth and storing it to be used across files
// const googleID = localStorage.getItem("googleID");



async function searchBook(query) {
    if (!query) return;

    currentQuery = query;
    currentPage = page;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=1&limit=7&fields=title,isbn,author_name,first_publish_year`;

    const res = await fetch(url);
    const data = await res.json();
    return data.docs[0];
}


async function getRecommendation(){
    subject = getSubject();
    const API_Key = "9b40eb178d8f4b698a8e8d6177f3f48c";
    const url =  "https://api.bigbookapi.com/search-books?api-key=" + API_Key + "&query=" + genre;
    const res = await fetch(url);
    const data = await res.json();
    const title = data.books[0].title;
    const book = searchBooks(title);
    addBook(book);
    window.location.href = `/details.html?isbn=${book[0]}`
}
