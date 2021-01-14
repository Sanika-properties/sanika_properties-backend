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
    },
    purpose: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    locationName:{
        type: String,
        required:true
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
});

module.exports = mongoose.model('Property', propertySchema);