const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
    title: String,
    teaID: {
        type: schema.Types.ObjectId,
        ref: 'teacher'
    },
    stuID: {
        type: schema.Types.ObjectId,
        ref: 'student'
    },
    score: Number,
    status: Number,
    expID: {
        type: schema.Types.ObjectId,
        ref: 'exp'
    },
    created: {
        type: Date,
        default: Date.now()
    }
})