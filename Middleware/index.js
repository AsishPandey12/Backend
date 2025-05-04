const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// The app.use() function in Express.js adds middleware to the application’s request-processing pipeline. It applies the specified middleware to all incoming requests or to specific routes, allowing you to modify request/response objects, perform operations, or handle errors throughout the application.

// app.use((req, res, next) => {
//   console.log("hi, I am 1st Middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("hi, I am 2nd Middleware");
//   next();
// });

// Logger - Morgan is middleware npm package
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

app.use("/random", (req, res, next) => {
  console.log("This is a random middleware");
  next();
});

// API token a query string
//Multiple Middleware - We can pass this middleware in any route.
const checkTokens = (req, res, next) => {
  let { token } = req.query;
  if (token == "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied!");
};

app.get("/api", checkTokens, (req, res) => {
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.get("/random", (req, res) => {
  res.send("Random page");
});

app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error Occured" } = err;
  res.status(status).send(message);
});

// Error Handling Middleware - 404
app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
