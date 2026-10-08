const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    messages: [
       { type: mongoose.Schema.Types.ObjectId,
        ref: "message",
        default: []}
    ]
}, { timestamps: true });

module.exports = mongoose.model("conversation", chatSchema);