const express = require("express");
const router = express.Router();

const {searchUser, getChatedWith} = require('../controller/userController')
const isLoggedIn = require("../middleware/isLoggedIn")

router.get("/userName", isLoggedIn, searchUser)
router.get("/chatWith", isLoggedIn, getChatedWith)

module.exports = router