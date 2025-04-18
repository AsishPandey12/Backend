const express = require("express");
const app = express();

let port = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data

app.get("/register", (req, res) => {
  let { user, password } = req.query;
  res.send(`Standard GET Response , Welcome ${user}`);
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { user, password } = req.body;
  res.send(`Standard POST Response , Welcome ${user}`);
});

app.listen(port, () => {
  console.log(`app is starting on ${port}`);
});
