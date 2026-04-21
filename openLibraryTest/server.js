const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API route (proxy to OpenLibrary)
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    const page = req.query.page || 1;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      q
    )}&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({
      docs: data.docs,
      numFound: data.numFound,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});