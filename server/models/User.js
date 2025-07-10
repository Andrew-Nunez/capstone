import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    enum: ["Asian Session", "London Session", "New York Session"]
  }
});

const User = mongoose.model("User", userSchema);
export default User;
