// getting googleID from Google Auth and storing it to be used across files
const googleID = localStorage.getItem("googleID");


async function topSubject(isbn){
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const res = await fetch(url);
    const data = await res.json();
    const book = data[`ISBN:${isbn}`];
    if(!book.subjects){
        return [];
    }
    const top_genere = subjects.splice(0,5).map((element, index, array) => {
        return element.name;
      });
    return top_genere;
}

async function loadShelf() {
    totalYear = 0;
    const res = await fetch(`/api/shelf/${googleID}`);
    const books = await res.json();

    const list = document.getElementById("shelfList");
    list.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement("li");
        li.innerText = `${book.title} (${book.author})`;
        totalYear = totalYear + parseInt(book.pud_date);


        // remove button
        const btn = document.createElement("button");
        btn.innerText = "Remove";
        
        btn.addEventListener("click", async () => {
            // remove from DOM
            li.remove();

            fetch(`/api/shelf/${googleID}/${book.id}`, {
                method: "DELETE"
            });

            });
        
        li.appendChild(btn)
        list.appendChild(li);
    });

    averageYear = Math.round(totalYear / books.length);
    if(averageYear > 0){
        averagePublishYear = document.getElementById("averagePublishYear");
        averagePublishYear.innerHTML = `Average published year of bookshelf: ${averageYear}`;
    }

}

// load on page start
loadShelf();
