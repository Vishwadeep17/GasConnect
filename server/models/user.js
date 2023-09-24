const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  // Other user-related fields
});

module.exports = mongoose.model('User', userSchema);
