const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const userSocketIdMap = {}
const getReceiverSocketId = (receiverId) => {
    return userSocketIdMap[receiverId]
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('new user connected', socket.id);

    if (userId !== undefined) userSocketIdMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys(userSocketIdMap));
    socket.on("disconnect", () => {
        delete userSocketIdMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketIdMap))
    })
})

module.exports = { app, io, server, getReceiverSocketId }