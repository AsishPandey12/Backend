const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

User.findOneAndDelete({ name: "Asish" }).then((res) => {
  console.log(res);
});

// User.findByIdAndDelete("68119ca2f6967d16272cc0e3").then((res) => {
//   console.log(res);
// });

// User.deleteMany({ age: 58 }).then((res) => {
//   console.log(res);
// });

// User.deleteOne({ name: "Bruce" }).then((res) => {
//   console.log(res);
// });

// User.findByIdAndUpdate(
//   "6811a165d91b9a914fc4ab4a",
//   { age: 46 },
//   { new: true }
// ).then((res) => {
//   console.log(res);
// });

// User.findOneAndUpdate({ name: "Bruce" }, { age: 43 }, { new: true }).then(
//   (res) => {
//     console.log(res);
//   }
// );

// User.findOne({ age: { $gte: 25 } }).then((data) => {
//   console.log(data);
// });

// User.findById("68119b9d492b347f521005d6").then((data) => {
//   console.log(data);
// });

// User.updateOne({ name: "Bruce" }, { age: 49 }).then((res) => {
//   console.log(res);
// });

// User.updateMany({ age: { $gt: 45 } }, { age: 58 }).then((res) => {
//   console.log(res);
// });

// User.insertMany([
//   { name: "Tony", email: "tony@gmail.com", age: 50 },
//   { name: "Bruce", email: "bruce@gmail.com", age: 30 },
//   { name: "Peter", email: "peter@gmail.com", age: 47 },
// ]).then((res) => {
//   console.log(res);
// });

// const user1 = new User({
//   name: "Asish",
//   email: "asish@gmail.com",
//   age: 22,
// });

// const user2 = new User({
//   name: "Rohit",
//   email: "rohit@gmail.com",
//   age: 23,
// });

// user1.save();
// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
