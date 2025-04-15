const express = require("express");
const app = express();

let port = 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

// Path parameters
app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  res.send(`Welcome to the page of @${username}`);
});

app.get("/search", (req, res) => {
  console.dir(req);
  let { q } = req.query;
  if (!q) {
    res.send(`<h1>Nothing Searched</h1>`);
  }
  res.send(`<h1>Search result for Query: ${q}</h1>`);
});

app.get("/", (req, res) => {
  res.send("You contacted home path");
});

// app.get("/about", (req, res) => {
//   res.send("You contacted about path");
// });

// app.get("/search", (req, res) => {
//   res.send("You contacted Search path");
// });

// app.get("**", (req, res, next) => {
//   res.send("this path does not exist");
// });

// app.post("/", (req, res) => {
//   res.send("You sent a post ");
// });

// app.use((req, res) => {
//   // app.use sare ki sare request ko listen karta hai
//   console.log(req);
//   console.log("request received");
//   res.send("this is a response");
// });
