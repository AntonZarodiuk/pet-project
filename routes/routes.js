const express = require('express');
const router = express.Router();
const CarPriceList = require('../models/CarPriceList');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');

router.get('/carlist/bmw-x5', async (req, res) => {
    let data = await CarPriceList.getData('BMW X5');
    res.json(data)
});

router.post('/registration', async (req, res) => {
    let body = await req.body;
    let newUser = new User({
        name: body.name,
        email: body.email,
        login: body.login,
        password: body.password
    });

    let validation = await User.validate(newUser);
    if (validation.success) {
        User.addUser(newUser);
        res.json(validation);
    } else {
        res.json(validation);
    }

});

router.post('/authorization', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.getUserByLogin(login, (err, result) => {
        result;
        if (err) {
            throw err;
        }
        if (!result) {
            return res.json({ success: false, msg: "Login or password is incorrect" });
        }
        User.comparePassword(password, result.password, (err, isMatch) => {
            if (err) {
                throw err
            }
            if (isMatch) {
                const token = jwt.sign(result.toJSON(), config.JWTsecret, {
                    expiresIn: '1h'
                })

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: result._id,
                        name: result.name,
                        login: result.login,
                        email: result.email
                    }
                })
            } else {
                return res.json({ success: false, msg: "Login or password is incorrect" })
            }
        })
    })
})

router.post('/change-password', async (req, res) => {
    let {login, oldPassword, newPassword} = req.body;
    User.changePassword(login, oldPassword, newPassword, (success, msg) => {
        // console.log(`From outter function: success: ${success}: ${msg}`)
        return res.json({ success, msg });
    });
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    // why is this function here and so empy inside?
})

module.exports = router;
