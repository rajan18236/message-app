const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")
const {sendMessage,getMessage} = require("../controller/messageController")


router.post("/send/:id", isLoggedIn, sendMessage)
router.get("/:id", isLoggedIn, getMessage)

module.exports = router