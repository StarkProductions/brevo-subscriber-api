const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

app.get("/subscriber-count", async (req, res) => {
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts?sort=desc&listIds=2', {
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Brevo API error" });
    }

    const data = await response.json();
    const count = data.count || 0;

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});