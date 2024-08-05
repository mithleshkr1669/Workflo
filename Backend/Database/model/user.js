import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: [true, "Email is existing"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

export const users =
  mongoose.models.users || mongoose.model("users", userSchema);
