require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { user } = require('../validations');





module.exports.signup_post = async (req, res, next) => {
    try {
        // value represents the user to be created whose password is hashed in mongoose hooks
        const newUser = await User.create({ ...req.body, role: 'user' });
        const data = { id: newUser._id, email: newUser.email, role: newUser.role };
        res.status(201).json(data);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            const err = new Error('User already exists');
            res.status(400);
            next(err);
        }
        next(err);
    }
}



module.exports.login_post = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const dbUser = await User.findOne({ email });//find user in db whose email matches with provided one
        if (!dbUser) {
            // provided email does not match with what's inside db
            res.status(422);
            throw new Error('User does not exist');
        }
        const passwordMatched = bcrypt.compareSync(password, dbUser.password);
        if (!passwordMatched) {
            // password does not match
            res.status(401);
            throw new Error('Wrong password');
        }
        // everything is fine we send token along with user data
        const token = jwt.sign({ data: dbUser }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(201).json({ dbUser, token });

    } catch (error) {
        next(error);
    }
}

module.exports.logout_get = async (req, res, next) => {
    res.send('Hello from logout handler');
}



module.exports.contact_post = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'ict1.sanika.properties@gmail.com',
            from: 'ict1.sanika.properties@gmail.com', // Use the email address or domain you verified 
            subject: 'Sanika properties contact form',
            text: `from:${req.body.email}:  ${req.body.message}`,
            html: `from:<emp>${req.body.email} <br></emp><strong>${req.body.message}</strong>`,
        };
        const result = await sgMail.send(msg);
        res.status(200).json(result)
    } catch (error) {
        res.status(error.code)
        return next(error);

    }

}