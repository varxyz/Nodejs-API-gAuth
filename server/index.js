const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
