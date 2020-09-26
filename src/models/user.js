const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
});


// Mongoose Hooks
userSchema.pre('save', async function (next) {
    // this refers to the local instance of user which in this case is the user that will be created
    try {
        // hash the password here
        this.password = await bcrypt.hash(this.password, 8);
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;