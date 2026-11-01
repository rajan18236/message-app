const express = require("express");
const router = express.Router();

const isLoggedIn  = require("../middleware/isLoggedIn")

const { userRegister, userLogin, userLogout, verifyUser } = require("../controller/userController")

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/verify", isLoggedIn, verifyUser);
router.get("/logout", isLoggedIn, userLogout);


module.exports = router