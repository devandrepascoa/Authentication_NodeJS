//API dependencies
const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const dbConfig = require("../config/database");
const jwt = require("jsonwebtoken");

const router = express.Router();


//Users
router.get("/", function (req, res) {
    res.send("API");
});

//Register
router.post("/register", function (req, res) {
    const user = new User({ //Instanciating new User based on request
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    //Adding user to the database
    User.addUser(user, function (err, user) {
        if (err) {
            res.json({ success: false, msg: "Failed to register user, " + err });
        } else {
            res.json({ success: true, msg: "User successfully added!" });
        }
    });
});

//Authentication
router.post("/authentication", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (password != undefined && username != undefined){
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: "Username or password is incorrect." });
            } else {
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({ data: user }, dbConfig.secretKey, {
                            expiresIn: 604800 // 1 WEEK
                        });

                        res.json({
                            success: true,
                            token: "JWT " + token,
                            msg: "Succesfully Authenticated, welcome!",
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        })
                    } else {
                        res.json({ success: false, msg: "Username or password is incorrect" })
                    }
                })
        
    
            }
       
        });
    }else{
        res.json({ success: false, msg: "Username or password are empty" })
    }
});

//Profile
router.get("/profile", passport.authenticate("jwt", { session: false }), function (req, res) {
    res.json({ user: req.user });
});

//Exporting router
module.exports = router;