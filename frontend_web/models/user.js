const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["english", "urdu"],
    default: "english",
  },
  mode: {
    type: String,
    enum: ["sign_to_text", "text_to_sign"],
    default: "sign_to_text",
  },
  userType: {
    type: String,
    enum: ["Deaf", "Non-Deaf"],
    default: "Deaf",
  },
});
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);