async function searchBook(query) {
    if (!query) return;

    currentQuery = query;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=1&limit=7&fields=title,isbn,author_name,first_publish_year`;

    const res = await fetch(url);
    const data = await res.json();
    return data.docs[0];
}


async function getRecommendation(){
    const subject = await getSubject();
    const API_Key = "e48849f6aa854973a9e1b2fab1a207b9";
    const url =  "https://api.bigbookapi.com/search-books?api-key=" + API_Key + "&query=" + subject;
    const res = await fetch(url);
    const data = await res.json();
    const title = data.books[0][0].title;
    const book = await searchBook(title);
    await addBook(book);
    window.location.href = `/details.html?isbn=${book.isbn}`
}
