const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Userdetail",
  },
});

const Userdetail = mongoose.model("Userdetail", userSchema);
const post = mongoose.model("posts", postSchema);

const addData = async () => {
  // let user1 = new Userdetail({
  //   username: "Asish",
  //   email: "asish@gmail.com",
  // });

  let user = await Userdetail.findOne({ username: "Asish" });

  // let post1 = new post({
  //   content: "Hello World",
  //   likes: 12,
  // });

  let post2 = new post({
    content: "How about learning Full Stack Dev",
    likes: 122,
  });

  post2.user = user;

  await post2.save();
};

addData();

const getData = async () => {
  let result = await post.find({}).populate("user");
  console.log(result);
};

getData();
