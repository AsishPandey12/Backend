const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats");
const methodoverride = require("method-override");
const ExpressError = require("../Middleware/ExpressError");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

main()
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

// Index Route - /chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//New route
app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => console.log("Chat was saved"))
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  // Asysnchronous Error
  if (!chat) {
    next(new ExpressError(404, "Chat Not Found"));
  }
  res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Delete Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status, message } = err;
  res.status(status).send(message);
});

app.get("/", (req, res) => {
  res.send("Working");
});
app.listen(8080, () => {
  console.log("Listening to port 8080");
});
