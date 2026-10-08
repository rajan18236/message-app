const express = require("express");
const router = express.Router();

const isLoggedIn  = require("../middleware/isLoggedIn")

const { userRegister, userLogin, userLogout } = require("../controller/userController")

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", isLoggedIn, userLogout);


module.exports = router