const mongoose = require("mongoose");
let schema = mongoose.Schema; //代表一个表
module.exports = new schema({

    name: String,
    sex: String,
    no: String, //ID
    college: String,
    class: String,
    password: String,
    email:String,
    created: {
        type: Date,
        default: Date.now()
    }
})