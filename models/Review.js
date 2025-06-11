const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // optional, adds createdAt and updatedAt
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
