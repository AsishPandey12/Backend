const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price is too low for selling"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  genre: [String],
  category: {
    type: String,
    enum: ["Fiction", "Non-Fiction"],
  },
});

const Book = mongoose.model("Book", bookSchema);

Book.findByIdAndUpdate(
  "6811cfbd09175f0a2af9bff6",
  { price: -100 },
  { runValidators: true }
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err.errors.price.properties.message));

// let book1 = new Book({
//   title: "A flicker in the dark",
//   author: "Stac Willingham",
//   price: 899,
//   genre: ["Story", "Fiction"],
//   category: "Fiction",
// });

// book1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
