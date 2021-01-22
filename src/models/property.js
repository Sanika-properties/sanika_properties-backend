const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: [
      "Flats & Apartments",
      "Industrial Land",
      "Residential",
      "Factory / Industrial",
      "Individual Houses",
      "Business Center",
      "Showrooms",
    ],
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  bedroom: {
    type: Number,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["Buy", "Sell"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

propertySchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
