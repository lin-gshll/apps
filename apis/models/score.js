var mongoose = require("mongoose");
var score = require("../schemas/score.js");
module.exports = mongoose.model("score", score);