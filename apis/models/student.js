var mongoose = require("mongoose");
var student = require("../schemas/student.js");
module.exports = mongoose.model("student", student);