const db = require('./db.js');
const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OAuth2Client("985222526221-dcekea3ej8vkkq9ut5i0cn7kid2u0hii.apps.googleusercontent.com");

app.use(express.json());
app.use(express.static("front_end"));

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "985222526221-dcekea3ej8vkkq9ut5i0cn7kid2u0hii.apps.googleusercontent.com"
    });

    const payload = ticket.getPayload();

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
