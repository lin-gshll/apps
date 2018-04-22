var mongoose = require("mongoose");
var work = require("../schemas/work.js");
module.exports = mongoose.model("work", work);