const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

// passport.use(new GoogleStrategy());

app
  .get('/', (req, res) => res.send({ hi: 'there' }))
  .listen(PORT, () => console.log('listening on port ', PORT));
