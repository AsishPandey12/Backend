const express = require("express");
const app = express();
const path = require("path");

let port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: "1a",
    username: "Asishpandey",
    content:
      "I love coding and there is no substitute for hard work. Buy Range Rover",
  },
  {
    id: "2b",
    username: "Rohitsharma",
    content: "I love nature and want to be an agriculturist.",
  },
  {
    id: "3c",
    username: "Shivamsingh",
    content: "MBA post Graduate looking forward to an internship.",
  },
];
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  const post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});
