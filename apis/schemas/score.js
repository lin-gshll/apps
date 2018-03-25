const mongoose = require("mongoose");
let schema = mongoose.Schema;
module.exports = new schema({
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