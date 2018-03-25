const mongoose = require("mongoose");
let schema = mongoose.Schema; //代表一个表
module.exports = new schema({
    name: String,
    password: String,
    status: Number
})