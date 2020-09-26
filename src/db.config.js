require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/sanika-properties' || process.env.DBURL;


module.exports = async function connectDb() {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('connected to DB');
    } catch (error) {
        console.log(error.message);
    }
}

