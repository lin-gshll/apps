const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
    stuID: String,
    score: {
        type: Number,
        default: -1
    },
    stuName:String,
    stuNo:String,
    status: String,
    expID: String,
    teaID: String,
    no: String,
    instru: String,
    title: String,
    college: String,
    start: String,
    end: String,
    workpath: {
        type: String,
        default: ""
    },
    originalname: {
        type: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now()
    }
})