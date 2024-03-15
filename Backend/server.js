const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const crypto = require('crypto');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// view engine
app.set('view engine', 'ejs');

// database connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then((result) => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));

// routes
app.use(petRoutes);
app.use(authRoutes);

// Generate a random secret key with 32 bytes and convert it to a hexadecimal string
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);

console.log('Running on port:', process.env.PORT || 5000);

module.exports = app;