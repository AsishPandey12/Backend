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

// Using wrapAsync - to handle Asynchronous errors
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// Index Route - /chats
app.get(
  "/chats",
  asyncWrap(async (req, res, next) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
  })
);

//New route
app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});

// Create Route
app.post(
  "/chats",
  asyncWrap(async (req, res, next) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
  })
);

// Edit Route
app.get(
  "/chats/:id/edit",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    // Asysnchronous Error
    if (!chat) {
      next(new ExpressError(404, "Chat Not Found"));
    }
    res.render("edit.ejs", { chat });
  })
);

// Update Route
app.put(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
  })
);

// Delete Route
app.delete(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  })
);

const handleValidationErr = (err) => {
  console.log("Validation error occurred");
  return err;
};

// Error handling Middleware - Mongoose Error
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

app.get("/", (req, res) => {
  res.send("Working");
});
app.listen(8080, () => {
  console.log("Listening to port 8080");
});
