const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pantry',
  }
});

const User = mongoose.model('User', userSchema);

const foodSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expirationDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Food = mongoose.model('Food', foodSchema);



module.exports = User;
module.exports = Food;