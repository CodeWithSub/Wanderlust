const mongoose = require('mongoose');
const Review = require('./review.js')

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: [300, "Description is too long"]
  },
  image: {
    filename: { type: String, default: "listingimage" },
    url: String
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } })
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;