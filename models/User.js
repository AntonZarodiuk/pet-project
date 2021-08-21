const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require("express");
const app = express();

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema);

User.getUserByLogin = async function (login, callback) {
    await User.findOne({ login }, callback);
};

User.getUserByEmail = async function (email, callback) {
    await User.findOne({ email }, callback);
};

User.getUserById = async function (id, callback) {
    await User.findById(id, callback);
};

User.validate = async function (user) {
    let { email, login } = await user;
    let response;
    let validEmail = false;
    let validLogin = false;
    await User.getUserByLogin(login, (err, result) => {
        if (err) throw err;
        if (result) {
            return response = { success: false, msg: 'Login is already used', type: "LoginError"}
        } else {
            validLogin = true;
        }
    });
    await User.getUserByEmail(email, (err, result) => {
        if (err) throw err;
        if (result) {
            return response = { success: false, msg: 'Email is already used', type: "EmailError"}
        } else {
            validEmail = true
        }
    });
    if (validEmail && validLogin) {
        response = {success: true, msg: 'Registration completed'};
    }
    return response;
};

User.addUser = function (newUser) {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
        });
    });

};

User.comparePassword = function (enteredPassword, DBPassword, callback) {
    bcrypt.compare(enteredPassword, DBPassword, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    })
};

module.exports = User;