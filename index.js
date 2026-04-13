const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

/* ✅ Serve frontend (VERY IMPORTANT) */
app.use(express.static(path.join(__dirname, "public")));

/* ✅ Default route (opens your UI) */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ✅ Example API route (optional) */
app.get("/api/test", (req, res) => {
  res.send("API is working 🚀");
});

/* ✅ Server */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});