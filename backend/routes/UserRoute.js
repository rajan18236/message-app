const express = require("express");
const router = express.Router();

const {searchUser, getChatedWith ,startChating} = require('../controller/userController')
const isLoggedIn = require("../middleware/isLoggedIn")

router.get("/name/:userName",isLoggedIn, searchUser)
router.get("/chatedWith", isLoggedIn, getChatedWith)
router.get("/startingChating/:startChatWith", isLoggedIn, startChating)

module.exports = router