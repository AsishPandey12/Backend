const mongoose = require("mongoose");
const Chat = require("./models/chats");

main()
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

let allchats = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, are we still on for the meeting at 3?",
    created_at: new Date(),
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Yes, absolutely. See you there!",
    created_at: new Date(),
  },
  {
    from: "Charlie",
    to: "Dana",
    msg: "Can you send me the project files?",
    created_at: new Date(),
  },
  {
    from: "Dana",
    to: "Charlie",
    msg: "Just sent them over. Let me know if anything's missing.",
    created_at: new Date(),
  },
  {
    from: "Eve",
    to: "Frank",
    msg: "Lunch today?",
    created_at: new Date(),
  },
  {
    from: "Frank",
    to: "Eve",
    msg: "Sure, where do you want to go?",
    created_at: new Date(),
  },
  {
    from: "Grace",
    to: "Heidi",
    msg: "Reminder: team call at 4 PM.",
    created_at: new Date(),
  },
  {
    from: "Heidi",
    to: "Grace",
    msg: "Thanks for the heads-up!",
    created_at: new Date(),
  },
  {
    from: "Ivan",
    to: "Judy",
    msg: "Did you review the latest report?",
    created_at: new Date(),
  },
  {
    from: "Judy",
    to: "Ivan",
    msg: "Yes, I just emailed my feedback.",
    created_at: new Date(),
  },
];

Chat.insertMany(allchats);
