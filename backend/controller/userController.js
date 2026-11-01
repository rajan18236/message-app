const user = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const conversationModel = require("../models/conversationModel");
const UserModel = require("../models/UserModel")

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
            fullName: fullName.toLowerCase(),
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
        } else {
            return res.status(401).json({ error: "Invalid credentials" })
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
        let { userName } = req.params;
        userName = userName.toLowerCase()
        const userArr = await user.find().select("-password")
        if (!userArr || userArr.length === 0) {
            return res.status(404).json({ message: " user not found" })
        }
        const filteredUser = userArr.filter((user) => user.fullName.includes(userName))
        res.status(200).json(filteredUser)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error })
    }
}

const getChatedWith = async (req, res) => {
    try {
        let userId = req.user._id

        const chatsWith = await conversationModel.find({ users: userId }).populate("users").select("-messages").sort({
            updatedAt: -1
        })

        if (!chatsWith) {
            return res.status(200).send([])
        }
        const Users = chatsWith.map((item) => (item.users))
        const otherUser = Users.map(items =>
            items.filter((obj) => obj._id.toString() !== userId.toString())[0]
        )
        res.status(200).json(otherUser)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json(error)
    }
}

const startChating = async (req, res) => {
    try {
        const userId = req.user._id;
        const { startChatWith } = req.params;

        const AnotherUser = await UserModel.findById( startChatWith.toString() ).select("-password")

        let conversation = await conversationModel.findOne({ users: { $all: [userId, startChatWith] } }).populate('messages');
        if (!conversation) {
            conversation = await conversationModel.create({
                users: [userId, startChatWith]
            })
        }
        res.status(200).json({ messages: conversation.messages, AnotherUser })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json(error)
    }
}
// Checks if the user is logged in using the JWT cookie (verified by isLoggedIn middleware)
const verifyUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: {
                _id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
            }
        })
    } catch (error) {
        console.error("Error verifying user:", error.message);
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

module.exports = { userRegister, userLogin, userLogout, searchUser, getChatedWith, startChating, verifyUser }