const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.gasOrder = require("./gasorder");
db.transaction = require("./transaction");
db.inventory = require("./inventoryItem");

db.ROLES = ["user", "admin", "supplier"];

module.exports = db;