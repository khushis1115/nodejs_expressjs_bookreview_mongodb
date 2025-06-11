const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Missing username or password' });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(409).json({ message: 'Username already exists' });

  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user)
    return res.status(401).json({ message: 'Invalid username or password' });

  req.session.username = username;
  res.json({ message: 'Logged in successfully' });
});

module.exports = router;

