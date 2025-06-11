const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  author: String,
  description: String,
  publishedYear: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
