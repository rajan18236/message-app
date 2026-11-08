const messageModel = require("../models/messageModel");
const conversation = require("../models/conversationModel");
const { io, getReceiverSocketId } = require("../Config/SocketIo.config")

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id

        if (senderId == receiverId) {
            return res.status(400).json({ error: "YOU cannot send to yourself" })
        }

        let chats = await conversation.findOne({ users: { $all: [senderId, receiverId] } })
        if (!chats) {
            chats = await conversation.create({
                users: [senderId, receiverId]
            })
        }
        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            textMessage: message,
            conversationId: chats._id
        })
        if (newMessage) {
            chats.messages.push(newMessage._id)
            await chats.save()
        }

        const receiverSocketId = getReceiverSocketId(receiverId)
        const senderSocketId = getReceiverSocketId(senderId)

        // Emit to both receiver and sender so both see the message in real-time
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
            // Send a separate notification so the receiver can play a sound
            // and track unread messages
            io.to(receiverSocketId).emit("notification", { senderId, message: newMessage })
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json({ success: true, newMessage })
    } catch (error) {
        console.error("Error : ", error.message);
        return res.status(500).json({ error })
    }
}

const getMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        console.log(receiverId, senderId);
        ;
        const chats = await conversation.findOne({
            users: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!chats) return res.status(200).send([])
        const message = chats.messages
        res.status(200).send(
            message
        )
    } catch (error) {
        console.error("error:", error.message);
        return res.status(500).json({ error })
    }

}

module.exports = { sendMessage, getMessage }