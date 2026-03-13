const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expirationDate: Date,
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
