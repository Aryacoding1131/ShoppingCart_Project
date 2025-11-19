import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  items: [ItemSchema],
  billingAmount: Number
});

export default mongoose.model("User", UserSchema);
