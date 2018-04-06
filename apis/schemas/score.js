const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
    stuID: String,
    score: {
        type: String,
        default:"0"
    },
    status: Number,
    expID: String,
    teaID:String,
    no:String,
    teaID:String,
    instru:String,
    title:String,
    college:String,
    end:String,
    created: {
        type: Date,
        default: Date.now()
    }
})