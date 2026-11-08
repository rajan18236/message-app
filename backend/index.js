const express = require("express")
const UserRoute = require("./routes/UserRoute")
const AuthRoute = require("./routes/AuthRoute")
const MessageRoute = require("./routes/MessageRoute")
const database = require("./Config/Database.config")
const dns = require("dns");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {app,server} = require("./Config/SocketIo.config")
const path  = require("path")


dns.setServers(["1.1.1.1", "8.8.8.8"])

require('dotenv').config()

app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/dist")))



const PORT = process.env.PORT || 5000

app.use("/api/search", UserRoute)
app.use("/api/user", AuthRoute)
app.use("/api/message", MessageRoute)

app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
database()

server.listen(PORT, () => {
    console.log("Server running  on port :", PORT);

})