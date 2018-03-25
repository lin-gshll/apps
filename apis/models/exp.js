var mongoose = require("mongoose");
var exp = require("../schemas/exp.js");
module.exports = mongoose.model("exp", exp);