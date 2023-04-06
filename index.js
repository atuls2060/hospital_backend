const express = require("express");
require("dotenv").config()
const cors = require("cors")
const { connection } = require("./utils/db");
const { usersRouter } = require("./routes/users.routes");
const { appointmentsRouter } = require("./routes/appointments.routes");

const app = express()
app.use(cors())
app.use(express.json())
app.use(usersRouter)
app.use(appointmentsRouter)



const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    try {
        await connection()
        console.log("connected to db")
    } catch (error) {
        console.log("error", error.message)
    }
    console.log(`Server running on port ${PORT}`)
})