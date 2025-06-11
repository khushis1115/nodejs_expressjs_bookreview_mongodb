require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');


console.log("🔍 MONGO_URI:", process.env.MONGO_URI);
console.log("🔍 SESSION_SECRET:", process.env.SESSION_SECRET);

const app = express();
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// Use routes
app.use('/', generalRoutes);
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
