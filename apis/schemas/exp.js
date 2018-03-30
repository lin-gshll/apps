const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
    title: String,
    no: String,
    teaID: String,
    status: String,
    college:String,
    created: {
        type: Date,
        default: Date.now()
    },
    start: String,
    end: String,
    maxStu: {
        type: Number,
        default: 100
    },
    guidBook: String
})