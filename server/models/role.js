const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String, // e.g., 'user', 'supplier', 'admin'
});

module.exports = mongoose.model('Role', roleSchema);
