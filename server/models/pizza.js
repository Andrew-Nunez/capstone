import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  });

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default mongoose.model("user", userSchema);
