const mongoose = require("mongoose");

async function connection() {
    mongoose.connect(process.env.MONGO_URL)
}

module.exports = {
    connection
}