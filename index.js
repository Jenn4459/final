const db = require('./db.js');
const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 3000;

// const client = new OAuth2Client("985222526221-dcekea3ej8vkkq9ut5i0cn7kid2u0hii.apps.googleusercontent.com");
const client = new OAuth2Client("841358619520-cfdk2429j154d7h472v4as6tj533pk57.apps.googleusercontent.com");
app.use(express.json());
app.use(express.static("front_end"));

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: "985222526221-dcekea3ej8vkkq9ut5i0cn7kid2u0hii.apps.googleusercontent.com"
      audience: "841358619520-cfdk2429j154d7h472v4as6tj533pk57.apps.googleusercontent.com"
    });

    const payload = ticket.getPayload();
    // i added this small code to check something just fyi
    const user = await db.findOrCreateUser(payload.sub, payload.name, payload.email);
    console.log("User info:", payload);

    

    res.json({
      message: "Login successful",
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

/* add books endpoint */

app.post("/api/shelf/add", async (req, res) => {
  try {
    const { googleID, bookID } = req.body;

    if (!googleID || !bookID) {
      return res.status(400).json({
        success: false,
        error: "Missing googleID or bookID"
      });
    }

    const result = await db.addBooktoShelf(googleID, bookID);

    if (result === 1) {
      return res.json({
        success: true,
        message: "Book added to shelf"
      });
    } else {
      return res.json({
        success: false,
        message: "Book already exists on shelf"
      });
    }

  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});


app.get("/api/shelf/:googleID", async (req, res) => {
  try {
    const { googleID } = req.params;

    if (!googleID) {
      return res.status(400).json({
        error: "Missing googleID"
      });
    }

    const shelf = await db.getUserShelf(googleID);

    res.json(shelf);

  } catch (err) {
    console.error("Error loading shelf:", err);
    res.status(500).json({
      error: "Server error"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
