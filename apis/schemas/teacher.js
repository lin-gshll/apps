const mongoose = require("mongoose");
let schema = mongoose.Schema; //代表一个表
module.exports = new schema({

    name: String,
    sex: Number,
    college: String,
    password: String,
    created: {
        type: Date,
        default: Date.now()
    },
    expID: {
        type: Array,
        default: [1]
    }
})