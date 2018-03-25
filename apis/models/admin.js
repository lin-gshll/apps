var mongoose = require("mongoose");
var admin = require("../schemas/admin.js");
module.exports = mongoose.model("admin", admin);