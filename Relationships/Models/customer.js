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

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// Mongoose Middleware - Deletion
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addCustomer = async () => {
//   let cust1 = new Customer({
//     name: "Rahul",
//   });

//   let order1 = await Order.findOne({ item: "Chips" });
//   let order2 = await Order.findOne({ item: "Chocalate" });

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);
//   let result = await cust1.save();

//   console.log(result);
// };
// addCustomer();

// Adding the order information in place of order id using (Populate method)
// const findCustomer = async () => {
//   let res = await Customer.findOne({ name: "Rahul" }).populate("orders");
//   console.log(res);
// };

// findCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { item: "Chips", price: 10 },
//     { item: "Samosa", price: 12 },
//     { item: "Chocalate", price: 50 },
//   ]);
//   console.log(res);
// };

// addOrders();

// const addCust = async () => {
//   let newCust = new Customer({
//     name: "Karan",
//   });

//   let newOrder = new Order({
//     item: "Bingos",
//     price: 250,
//   });

//   newCust.orders.push(newOrder);

//   await newCust.save();
//   await newOrder.save();
//   console.log("Customer and Order saved successfully");
// };

// addCust();

const deleteCust = async () => {
  let res = await Customer.findByIdAndDelete("681e306f5cd87b58875db1ca");
  console.log(res);
};

deleteCust();
