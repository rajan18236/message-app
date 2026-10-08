const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    textMessage: {
        type:String,
        required: true
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversation'
    }
}, { timestamps: true })

module.exports = mongoose.model("message", messageSchema)