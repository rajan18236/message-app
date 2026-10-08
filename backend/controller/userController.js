const user = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const conversationModel = require("../models/conversationModel");

const userRegister = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Something is missing' })
        }
        const userData = await user.findOne({ email });
        if (userData) {
            return res.status(409).json({ err: "Email has already register" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            fullName,
            email,
            password: hashPassword,
        })
        const token = jwt.sign({ email, userId: newUser._id }, 'shhhhh');
        res.cookie("token", token)
        res.status(201).json({
            success: true,
            message: 'User register Successfully'
        })

    } catch (error) {
        console.error("Error On userRegister:", error.message);
        return res.status(500).json({ error })
    }

}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Something is missing' })
        }
        const userData = await user.findOne({ email })
        if (!userData) {
            return res.status(404).json({ error: 'User not found' })
        }
        const result = await bcrypt.compare(password, userData.password)
        if (result) {
            const token = jwt.sign({ email, userId: userData._id }, 'shhhhh');
            res.cookie("token", token)
            res.status(201).json({
                success: true,
                message: 'User login Successfully'
            })
        }
    } catch (error) {
        console.error("Error On user login:", error.message);
        return res.status(500).json({ error })
    }
}

const userLogout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ success: true, message: 'Logout successfully' })

    } catch (error) {
        res.status(500).json({ error })
        return console.log("Error:", error.message);

    }

}

const searchUser = async (req, res) => {
    try {
        let { userName } = req.query;
        userName = userName.toLowerCase()
        const userArr = await user.find({ fullName: userName }).select("-password")
        if (!userArr) {
            return res.status(404).json({ message: " user not found" })
        }
        res.status(200).json({ userArr })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error })
    }
}

const getChatedWith = async (req, res) => {
    try {
        let userId = req.user._id

        const chatsWith = await conversationModel.find({ users: userId }).select("-messages").sort({
            updatedAt: -1
        })
        if (!chatsWith) {
            return res.status(200).send([])
        }
        const otherUser = chatsWith.map((item) => {
            return item.users.filter((id) => id.toString() !== userId.toString())[0]
        })
        res.status(200).json(otherUser)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error })
    }

}

module.exports = { userRegister, userLogin, userLogout, searchUser, getChatedWith }