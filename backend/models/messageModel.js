const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    textMessage: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("message", messageSchema)