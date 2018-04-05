const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/google_auth'
);

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
