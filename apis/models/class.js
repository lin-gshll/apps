var mongoose = require("mongoose");
var class_ = require("../schemas/class.js");
module.exports = mongoose.model("class", class_);