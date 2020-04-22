//dependencies for User class
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    //Query for username of type username from UserSchema
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.getUserByEmail = function (email, callback) {
    //Query for username of type username from UserSchema
    const query = { email: email }
    User.findOne(query, callback);
}

//Adding user to the database 
module.exports.addUser = function (user, callback) {
    if (!emailIsValid(user.email)) {
        callback("Validation Error: email is not valid", user);
    } else {
        emailExists(user.email, function (exists) {
            if (exists) {
                callback("Registration Error: email already exists");
            } else {
                usernameExists(user.username, function (exists) {
                    if (exists) {
                        callback("Registration Error: username already exists");
                    } else {
                        bcrypt.genSalt(10, function (arr, salt) {
                            bcrypt.hash(user.password, salt, function (err, hash) {
                                if (err) throw err;
                                user.password = hash;
                                user.save(callback);
                            })
                        });
                    }
                })

            }
        });
    }
}

module.exports.comparePassword = function (password, hashedPassword, callback) {
    bcrypt.compare(password, hashedPassword, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

//Check if email already exists in database
var emailExists = function (email, callback) {
    User.getUserByEmail(email, (err, email) => {
        if (err) throw err;
        if (email) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

//Check if email already exists in database
var usernameExists = function (username, callback) {
    User.getUserByUsername(username, (err, username) => {
        if (err) throw err;
        if (username) {
            callback(true);
        } else {
            callback(false);
        }
    });
}


//Check if email is valid
var emailIsValid = function (email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
}