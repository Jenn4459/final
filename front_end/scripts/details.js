const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");

async function bookDeatils(isbn){
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const res = await fetch(url);
    const data = await res.json();
    const book = data[`ISBN:${isbn}`];

    document.getElementById("title").innerText = book.title;
    document.getElementById("author_name").innerText =
        book.authors?.map(a => a.name).join(", ");
    document.getElementById("first_publish_year").innerText =
        book.publish_date;

    const resultsDiv = document.getElementById("subjects");
    resultsDiv.innerHTML = "";

    book.subjects.slice(0,3).forEach(subject => {
        const div = document.createElement("div");
        div.className = "subject";
        div.innerHTML = `${subject.name}`;
        resultsDiv.appendChild(div);
    });

    const coverImg = document.createElement("img");
    coverImg.src = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    coverImg.alt = book.title;
    coverImg.className = "cover";

    document.getElementById("cover").appendChild(coverImg);
}

bookDeatils(isbn)