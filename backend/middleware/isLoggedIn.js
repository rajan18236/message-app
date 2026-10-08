const jwt = require("jsonwebtoken");
const user = require("../models/UserModel")

const isLoggedIn = async (req, res, next) => {

    try {
        const accessToken = req.cookies.token

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again.",
            });
        }
        const decoded = jwt.verify(accessToken, 'shhhhh');

        const userData = await user.findById(decoded.userId)

        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }
        req.user = userData
        next()
    } catch (error) {
        console.error("isLoggedIn:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token.",
        });
    }
}

module.exports = isLoggedIn