require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        const error = new Error('unauthorized 🚫')
        next(error);
    }
    next();
}


const checkTokenAndSetUser = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
            if (err) {
                res.status(401);
                next(err);
            } else {
                req.user = payload.data;
            }
        });
    }
    next();
}


module.exports = {
    isLoggedIn,
    checkTokenAndSetUser
}