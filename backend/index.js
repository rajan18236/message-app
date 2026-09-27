const express = require("express")
const UserRoute = require("./routes/UserRoute")
const database = require("./Config/Database.config")
const app = express();


require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use("/api/user", UserRoute)
database()
app.listen(PORT, () => {
    console.log("Server running  on port :", PORT);

})