const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  /**cookieSession extracts cookie data and assignes it to
   * req.session object which in our case is the data passport is
   * attempting to store inside the cookie
   */
  cookieSession({
    maxAge: 864000000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
