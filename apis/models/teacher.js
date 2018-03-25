var mongoose = require("mongoose");
var teacher = require("../schemas/teacher.js");
module.exports = mongoose.model("teacher", teacher);