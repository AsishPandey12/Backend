const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");

let port = 8080;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create connection between Node(server) and MySQL(db)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "USER_DATABASE",
  password: "Data@2025",
});

// To get random user from faker package

// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// // INSERTING new data

// let q = "INSERT INTO user (id , username , email , password) VALUES ?";

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser()); // 100 fake user data
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result); // result is always in array form
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end(); // to end the connection with database

// Home Route
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
    });
  } catch {
    console.log(err);
    res.send("some error in DB");
  }
});

// Show Route
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE ID = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("editform.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

// Update (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE ID = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPassword != user.password) {
        res.send("wrong password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE ID = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
