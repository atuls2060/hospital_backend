const usersRouter = require("express").Router();
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


usersRouter.post("/signup", async (req, res) => {
    const userData = req.body

    const user = await UserModel.findOne({ email: userData.email })
    if (user) {
        res.status(401).send({ message: "User Already Exists" })
    } else {


        bcrypt.hash(userData.password, 2, (err, hash) => {
            if (err) {
                console.log("error", err.message)
                return
            }
            const newUser = new UserModel({ ...userData, password: hash })
            newUser.save()
            res.send({ message: "User Registered" })
        })
    }
})


usersRouter.post("/login", async (req, res) => {
    const userData = req.body
    const user = await UserModel.findOne({ email: userData.email })
    if (user) {
        bcrypt.compare(userData.password, user.password, (err, matching) => {
            if (err) {
                console.log("error", err.message)
                return
            }

            if (matching) {
                const payload = { _id: user._id, email: user.email }
                console.log(payload)
                jwt.sign(payload, process.env.SECRET, (err, token) => {
                    if (err) {
                        console.log("error", err.message)
                        return
                    }
                    res.send({ token })
                })
            } else {
                res.status(401).send({ message: "Email or password is incorrect" })
            }


        })
    } else {
        res.status(401).send({ message: "User Does not Exists" })
    }
})

module.exports = {
    usersRouter
}

