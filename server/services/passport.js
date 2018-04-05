const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//keys are the data(clientID, secret, etc) provided by google for your app
const keys = require('../config/keys');

const User = mongoose.model('google_users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //callbackURL is the url google will use to send the query-string
      //code back to the server so we can make a follow-up request
      //to get the actual user profile
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      new User({
        googleID: profile.id
      }).save();
    }
  )
);
