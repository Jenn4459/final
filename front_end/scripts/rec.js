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

    const googleID = localStorage.getItem("googleID");
    const shelfRes = await fetch(`/api/shelf/${googleID}`);
    const userShelf = await shelfRes.json();
    
    const API_Key = "e48849f6aa854973a9e1b2fab1a207b9";
    const url =  "https://api.bigbookapi.com/search-books?api-key=" + API_Key + "&query=" + subject;
    const res = await fetch(url);
    const data = await res.json();

    const filteredBooks = data.books.filter(book => {
        return !userShelf.some(shelfBook => shelfBook.title === book.title);
    });

    if (filteredBooks.length > 0) {
        const book = filteredBooks[0];
        const title = book.title;
        const searchResult = await searchBook(title);
        if (searchResult && searchResult.isbn && searchResult.isbn[0]) {
            window.location.href = `/details.html?isbn=${searchResult.isbn[0]}`;
        } else {
            alert("Found a recommendation, but could not find book details.");
        }
    } else {
        alert("No new recommendations — add books from different subjects to see new suggestions!");
    }
    
    // const title = data.books[0][0].title;
    // const book = await searchBook(title);
    // window.location.href = `/details.html?isbn=${book.isbn[0]}`
}


async function searchBook(query) {
    if (!query) return;

    currentQuery = query;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=1&limit=7&fields=title,isbn,author_name,first_publish_year`;

    const res = await fetch(url);
    const data = await res.json();
    return data.docs[0];
}
