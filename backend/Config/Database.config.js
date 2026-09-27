const mongoose = require("mongoose")
require("dotenv").config()

const database = () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Successfully connect to database");

    }).catch((err) => {
        console.error("Error on connecting database:", err);
        process.exit(1)
    })
}

module.exports = database