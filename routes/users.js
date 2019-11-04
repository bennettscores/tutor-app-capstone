const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

const User = require("../models/user");


router.post("/register", (req, res) => {


    const { erro .rs, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.data.email }).then(user => {
        if (user) {

            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });

        }
    });

});

router.post("/login", (req, res) => {
    console.log(req.body.auth)
    const { errors, isValid } = validateLoginInput(req.body.auth);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.auth.email;
    const password = req.body.auth.password;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found", user: user })
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({
                    name: user.name,
                    status: "created"
                })
            } else {
                return res.status(400).json({ passwordincorrect: "Password is incorrect" })
            }
        })
    })
})




module.exports = router