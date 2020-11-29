const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    images: [
        {
            url: String,
            filename: String
        }
    ],
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Property', propertySchema);