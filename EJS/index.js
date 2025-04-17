const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  const instadata = require("./data.json");
  const data = instadata[username];
  if (data) {
    res.render("ig.ejs", { data });
  } else {
    res.render("error.ejs");
  }

  // const followers = ["Shubham", "Rohit", "Ankur", "Dhoni"];
  // let { username } = req.params;
  // res.render("ig.ejs", { username, followers });
});

//passing data to EJS
app.get("/roll", (req, res) => {
  let diceval = Math.floor(Math.random() * 6 + 1);
  res.render("rolldice.ejs", { diceval });
});

app.listen(port, () => {
  console.log(`app is starting on port ${port}`);
});
