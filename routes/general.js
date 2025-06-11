const express = require('express');
const router = express.Router();
console.log('✅ general.js: router created');

const Book = require('../models/Book');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth.middleware');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// ✅ Add a new book
router.post('/book', async (req, res) => {
  try {
    const { isbn, title, author, description, publishedYear } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const newBook = new Book({
      isbn,
      title,
      author,
      description,
      publishedYear
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('❌ Error adding book:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review
router.post('/review/:isbn', authMiddleware, async (req, res) => {
  const { review } = req.body;
  const { isbn } = req.params;
  const username = req.session.username;

  const book = await Book.findOne({ isbn });
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const newReview = new Review({ isbn, username, review });
  await newReview.save();

  res.status(201).json({ message: 'Review added' });
});

// Get reviews for a book
router.get('/review/:isbn', async (req, res) => {
  const reviews = await Review.find({ isbn: req.params.isbn });
  res.json(reviews);
});

module.exports = router;
