const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
    stuID: String,
    teaID:String,
    scoreID:String,
    instru:String,
    title:String,
    college:String,
    start:String,
    end:String,
    score:String,
    workpath:String,
    originalname:String,
    created: {
        type: Date,
        default: Date.now()
    }
})